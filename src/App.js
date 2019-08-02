import React from 'react';
import './app.scss'
import ChatProvider from './components/providers/ChatProvider'
import Header from './components/application/header/Header'
import ProtectedRoute from './components/application/ProtectedRoute.js'
import Home from './components/routes/home/Home'
import Room from './components/routes/room/Room'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

const App = () => (
  <BrowserRouter>
    <ChatProvider>
      <Header />
      <Switch>
        <Route
          component={Home}
          exact
          path='/'
        />
        <ProtectedRoute
          exact
          path='/room/:conversationId/:displayName'
          protectedComponent={Room}
        />
      </Switch>
    </ChatProvider>
  </BrowserRouter>
)

export default App

