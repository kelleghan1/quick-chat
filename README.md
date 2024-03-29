## Twilio Quick Chat

To install node modules for both the client and server, run `npm install` in the project directory.

To start the servers for both the client and server, run `npm run dev` in the project directory.

In a browser, navigate to http://localhost:3000/ (This should open automatically)

To test, run `npm run test` in the project directory.

## Notes

* Both the client and server are included in this repo because some changes were needed 
to get the client and server to work together to meet requirements.

* The SDK was originally built for a node environment so I modified the websocket 
constructor for use in the browser.

* In order to allow for the user to view 10 messages prior to joining a room the join-room 
action needed to be separated from the initial connection. The server also needed to be 
modified to allow for a user that has not joined a room to retrieve messages for a room.

* I added a getMessages method to the QuickChatClient constructor.

* The SDK is packed and imported into the project as a node module through the package.json 
from local_modules/interview-client/interview-client-1.0.0.tgz. 

* Created with create-react-app.

* Utilizes the React Context API.

* Utilizes SCSS modules to scramble classnames.

* Enzyme was included for component testing.

* Utilizes Concurrently to start server and client in parallel.