import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Spacer from '../spacer/Spacer'
import styles from './messageItem.module.scss'

class MessageItem extends Component {
  render() {
    const {
      type,
      user,
      message,
      isOutgoing
    } = this.props

    let messageClass = styles['message-item']

    if (isOutgoing) messageClass = `${messageClass} ${styles['outgoing']}`

    return (
      <Spacer>
        <div className={styles['item-wrapper']}>
          {
            type === 'message' &&
            <div className={messageClass}>
              <Spacer>
                {
                  user &&
                  <div className={styles['user']}>
                    {user}
                  </div>
                }
                <div className={styles['message']}>
                  {message}
                </div>
              </Spacer>
            </div>
          }
          {
            type === 'event' &&
            <div className={styles['event-item']}>
              <Spacer>
                <div className={styles['message']}>
                  {message}
                </div>
              </Spacer>
            </div>
          }
        </div>
      </Spacer>
    )
  }
}

MessageItem.propTypes = {
  isOutgoing: PropTypes.bool,
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['event', 'message']).isRequired,
  user: PropTypes.string
}

export default MessageItem
