import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

export const ChatContext = React.createContext()

export const ChatConsumer = ChatContext.Consumer

class ChatProvider extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    history: PropTypes.object.isRequired
  }

  constructor() {
    super()

    this.state = {}
  }

  render() {
    return (
      <ChatContext.Provider value={this.state}>
        {this.props.children}
      </ChatContext.Provider>
    )
  }
}

export default withRouter(ChatProvider)
