import PropTypes from 'prop-types'
import React, { Component } from 'react'

class MessageList extends Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

MessageList.propTypes = {
  children: PropTypes.node.isRequired
}

export default MessageList
