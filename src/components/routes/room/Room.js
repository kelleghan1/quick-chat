import Container from '../../common/container/Container'
import React, { Component } from 'react'
import Spacer from '../../common/spacer/Spacer'
import TextHeader from '../../common/textHeader/TextHeader'
import ChatForm from '../../common/chatForm/ChatForm'
import { ChatContext } from '../../providers/ChatProvider'
import MessageList from '../../common/messageList/MessageList'
import styles from './room.module.scss'
import MessageItem from '../../common/messageItem/MessageItem'

export default class Room extends Component {
  static contextType = ChatContext;

  componentDidUpdate() {
    if (this.listWrapper) {
      this.listWrapper.scrollTo(0, this.listWrapper.scrollHeight)
    }
  }

  componentDidMount() {
    if (this.listWrapper) {
      this.listWrapper.scrollTo(0, this.listWrapper.scrollHeight)
    }
  }

  render() {
    const {
      displayName,
      conversationId,
      chatHistory
    } = this.context

    return (
      <Container background='white'>
        <div className={styles['room']}>
          <Spacer>
            <TextHeader
              size={2}
            >
              {`Room ${conversationId}`}
            </TextHeader>
          </Spacer>
          <div
            ref={ref => { this.listWrapper = ref }}
            className={styles['message-list-wrapper']}
          >
            <MessageList>
              {
                chatHistory && chatHistory.length === 0 &&
                <MessageItem
                  message={'No messages yet!'}
                  type={'event'}
                />
              }
              {
                chatHistory && !!chatHistory.length &&
                chatHistory.map((item, index) =>
                  <MessageItem
                    isOutgoing={item.user === displayName}
                    key={`${item.message}${index}`}
                    message={item.message}
                    type={item.type}
                    user={item.user}
                  />
                )
              }
            </MessageList>
          </div>
          <div className={styles['chat-form-wrapper']}>
            <ChatForm />
          </div>
        </div>
      </Container>
    )
  }
}
