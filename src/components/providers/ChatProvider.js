import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Loading from '../common/loading/Loading'
import { withRouter } from 'react-router-dom'
// import QuickChatClient from 'interview-client'
import QuickChatClient from './index'

export const ChatContext = React.createContext()

export const ChatConsumer = ChatContext.Consumer

class ChatProvider extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  }

  constructor() {
    super()

    this.state = {
      authenticate: this.authenticate,
      chatHistory: [],
      clearUser: this.clearUser,
      conversationId: null,
      displayName: null,
      isAuthenticated: false,
      isLoading: false,
      isLoggedIn: false,
      joinRoom: this.joinRoom,
      logout: this.logout,
      requestRoom: this.requestRoom,
      sendMessage: this.sendMessage
    }
  }

  addToHistory = obj => {
    const newHistory = [...this.state.chatHistory]

    newHistory.push(obj)
    this.setState({ chatHistory: newHistory })
  }

  authenticate = () => {
    this.client.authenticate()
  }

  clearUser = callback => {
    this.setState(
      {
        conversationId: null,
        displayName: null,
        error: null,
        chatHistory: [],
        isLoggedIn: false
      },
      () => {
        this.props.history.push('/')
        if (callback) callback()
      }
    )
  }

  createClient = (displayName, conversationId) => {
    this.client = new QuickChatClient(displayName, conversationId)

    this.client.on('authenticated', () => {
      this.setState({
        isAuthenticated: true
      })
    })

    this.client.on('connected', () => {
      this.client.getMessages()
        .then(history => {
          this.setState({
            displayName,
            isLoading: false,
            chatHistory: this.parseHistory(history),
            conversationId
          })
        })
        .catch(() => {
          this.setState({
            displayName,
            isLoading: false,
            conversationId
          })
        })
    })

    this.client.on('conversation-joined', () => {
      const {
        conversationId,
        displayName
      } = this.state

      this.setState(
        { isLoggedIn: true },
        () => {
          this.props.history.push(`/room/${conversationId}/${displayName}`)
        }
      )
    })

    this.client.on('message-added', data => {
      this.addToHistory(
        this.getHistoryObj(data, 'message')
      )
    })

    this.client.on('member-joined', data => {
      if (data !== this.state.displayName) {
        this.addToHistory(
          this.getHistoryObj(`${data} joined the conversation!`, 'event')
        )
      }
    })

    this.client.on('member-left', data => {
      this.addToHistory(
        this.getHistoryObj(`${data} left the conversation`, 'event')
      )
    })
  }

  joinRoom = () => {
    this.client.joinConversation()
      .catch(error => {
        this.setState({ error: error.body })
      })
  }

  getHistoryObj = (item, type) => {
    if (type === 'message') {
      return {
        type,
        user: item.split(':')[0],
        message: item.split(':')[1].replace(' ', '')
      }
    }

    if (type === 'event') {
      return {
        type,
        message: item
      }
    }
  }

  logout = () => {
    const callback = () => { this.client.disconnect() }
    this.clearUser(callback)
  }

  parseHistory = history =>
    history.map(item => this.getHistoryObj(item, 'message'))

  requestRoom = (displayName, conversationId) => {
    this.setState({ isLoading: true },
      this.createClient(displayName, conversationId)
    )
  }

  sendMessage = message => {
    this.client.sendMessage(message)
  }

  render() {
    return (
      <ChatContext.Provider value={this.state}>
        {this.state.isLoading && <Loading />}
        {this.props.children}
      </ChatContext.Provider>
    )
  }
}

export default withRouter(ChatProvider)
