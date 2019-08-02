

const EventEmitter = require('events').EventEmitter;
const WebSocketClient = require('websocket').w3cwebsocket;
const inherits = require('util').inherits;
const signJwt = require('jsonwebtoken').sign;

const JWT_SECRET = 'dr4w-th3-0wl';
const SERVER_URI = 'ws://localhost:8081';

function QuickChatClient(displayName, conversationId) {
  // Keeps track of promise handlers for websocket requests
  // key=reqId, value={ resolve, reject }
  const requestHash = {};

  // Array of objects to track messages in order.
  // { msgObj, resolve, reject }
  const messageQueue = [];

  const wsClient = new WebSocketClient(SERVER_URI);
  let currentId = 1;

  const init = () => {
    throwIfInvalid(displayName);
    throwIfInvalid(conversationId);

    this.displayName = displayName;
    this.conversationId = conversationId;

    EventEmitter.call(this);

    wsClient.onopen = onConnect;
  };

  const enqueue = (item) => messageQueue.push(item);

  const hasMessagePending = () => !!messageQueue.length;

  const throwIfInvalid = (param) => {
    if (!param || typeof param !== 'string') {
      throw `${param} must be a string`;
    }
  };

  const onConnect = () => {
    this.connection = wsClient;
    this.connection.onmessage = onMessage;

    this.emit('connected')

    // sendObject({
    // command: 'join-conversation',
    //   args: {
    //     displayName: this.displayName,
    //     conversationId: this.conversationId
    //   }
    // })
    //   .then(() => { this.emit('connected') })
    //   .catch(error => {
    //     this.emit('no-conversation')
    //   });
  };

  const onMessage = message => {
    let msgObj = {};
    // Protect for invalid json
    try {
      msgObj = JSON.parse(message.data);
    } catch (e) {
      console.warn(`Received invalid json string: ${message.data}`);
    }

    switch (msgObj.type) {
      case 'response':
        handleResponse(msgObj);
        break;
      case 'event':
        handleEvent(msgObj);
        break;
      default:
        console.log(`Received an unknown message: ${message}`);
        break;
    }
  };

  const handleResponse = (msgObj) => {
    // Pass to a request handler if it exist
    const handler = requestHash[msgObj.reqId];
    if (handler) {
      // We don't need this handler anymore, we got our response
      delete requestHash[msgObj.reqId];
      // Resolve or reject the promise, base on statusCode
      const fn = msgObj.statusCode === 200 ? handler.resolve : handler.reject;
      fn(msgObj);
    } else {
      console.log('Received an unknown response object', msgObj);
    }
  };

  const handleEvent = (msgObj) => {
    switch (msgObj.name) {
      case 'new-message':
        this.emit('message-added', decodeURIComponent(msgObj.data));
        break;
      case 'member-joined':
        this.emit('member-joined', msgObj.data);
        break;
      case 'member-left':
        this.emit('member-left', msgObj.data);
        break;
      default:
        // Handle other events
        console.log(`Unhandled event: ${msgObj.name}`);
        break;
    }
  };

  const sendObject = obj => {
    // Add request id
    const reqObj = { reqId: currentId++, ...obj };
    // Send it off
    wsClient.send(JSON.stringify(reqObj));
    // Track the handlers and return a promise. Will be used when received a response
    return new Promise((resolve, reject) => requestHash[reqObj.reqId] = { resolve, reject });
  };

  const processQueue = async () => {
    while (messageQueue.length) {
      // Grab first item, don't remove from array yet until finish
      const { msgObj, resolve, reject } = messageQueue[0];
      let res;
      let err;
      // Can't use then/catch/finally here, we want to remove item before resolving
      try {
        res = await sendObject(msgObj);
      } catch (e) {
        err = e;
      }
      // Remove the item
      messageQueue.shift();

      // Resolve/reject
      err ? reject(err) : resolve(res);
    }
  };

  // Public functions
  this.enqueue = enqueue;
  this.sendObject = sendObject;
  this.processQueue = processQueue;
  this.hasMessagePending = hasMessagePending;

  // Initialize
  init();
}

inherits(QuickChatClient, EventEmitter);

QuickChatClient.prototype.disconnect = function disconnect() {
  this.connection.close();
};

QuickChatClient.prototype.getMessages = function getMessages() {
  return this.sendObject({
    command: 'get-messages',
    args: { conversationId: this.conversationId }
  }).then((res) => res.body.split(',').map((m) => decodeURIComponent(m)));
};

QuickChatClient.prototype.joinConversation = function joinConversation() {
  return this.sendObject({
    command: 'join-conversation',
    args: {
      displayName: this.displayName,
      conversationId: this.conversationId
    }
  }).then(() => { this.emit('conversation-joined') })
};

QuickChatClient.prototype.sendMessage = function sendMessage(message) {
  return new Promise((resolve, reject) => {
    const msgObj = {
      command: 'send-message',
      args: { text: message }
    };
    // Check if queue is still processing before adding to queue
    const hasPending = this.hasMessagePending();

    // Add item into the queue
    this.enqueue({ msgObj, resolve, reject });

    // If queue is not busy, kick it off
    if (!hasPending) {
      this.processQueue();
    }
  });
};

// Stretch Goals
QuickChatClient.prototype.authenticate = function authenticate() {
  const token = signJwt({
    // Expires 24 hours. Expressed in seconds
    exp: Math.floor((Date.now() / 1000) + 86400),
    admin: true
  }, JWT_SECRET);

  return this.sendObject({
    command: 'authenticate',
    args: {
      // README mentioned this is 'jwt' property. But the server expects 'token' property.
      // Send both for now...
      jwt: token,
      token
    }
  });
};

QuickChatClient.prototype.removeMember = function removeMember(name) {
  return this.sendObject({
    command: 'remove-member',
    args: { name }
  });
};

module.exports = QuickChatClient;
