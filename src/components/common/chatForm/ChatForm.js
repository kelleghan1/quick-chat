import PropTypes from 'prop-types'
import React, { Component } from 'react'
import styles from './chatForm.module.scss'
import Spacer from '../spacer/Spacer'
import { ChatContext } from '../../providers/ChatProvider'

class MessageList extends Component {
  static contextType = ChatContext;

  state = {
    message: ''
  }

  handleMessageChange = event => {
    this.setState({
      message: event.target.value
    })
  }

  handleSubmitMessage = event => {
    event.preventDefault()

    const { message } = this.state

    if (message) {
      this.setState(
        { message: '' },
        this.context.sendMessage(message)
      )
    }
  }

  render() {
    const { message } = this.state

    return (
      <div className={styles['chat-form']}>
        {
          <form onSubmit={this.handleSubmitMessage}>
            <Spacer>
              <Spacer noX>
                <div className={styles['input-wrapper']}>
                  <label htmlFor='message-input'>Send Message</label>
                  <input
                    className={styles['message-input']}
                    autoComplete='off'
                    onChange={this.handleMessageChange}
                    value={message}
                    id='message-input'
                    type='text'
                  />
                  <input
                    className={styles['dark']}
                    disabled={!message}
                    type='submit'
                    value='Send Message'
                  />
                </div>
              </Spacer>
            </Spacer>
          </form >
        }
      </div>
    )
  }
}

export default MessageList
