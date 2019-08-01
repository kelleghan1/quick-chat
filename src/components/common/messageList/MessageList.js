import PropTypes from 'prop-types'
import React, { Component } from 'react'
import styles from './messageList.module.scss'

class MessageList extends Component {
  render() {
    return (
      <div className={styles['message-list']}>
        {this.props.children}
      </div>
    )
  }
}

MessageList.propTypes = {
  children: PropTypes.node.isRequired
}

export default MessageList
