import React from 'react';
import './app.scss'
import ChatProvider from './components/providers/ChatProvider'
import QuickChatClient from 'interview-client'
import Header from './components/application/header/Header'
import Home from './components/routes/home/Home'
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
      </Switch>
    </ChatProvider>
  </BrowserRouter>
)

export default App

