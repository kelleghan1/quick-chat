import Container from '../../common/container/Container'
import React, { PureComponent, Fragment } from 'react'
import Spacer from '../../common/spacer/Spacer'
import JoinRoomForm from '../../common/joinRoomForm/JoinRoomForm'
import Button from '../../common/button/Button'
import TextHeader from '../../common/textHeader/TextHeader'
import MessageItem from '../../common/messageItem/MessageItem'
import { ChatContext } from '../../providers/ChatProvider'
import styles from './home.module.scss'

export default class Home extends PureComponent {
  static contextType = ChatContext;

  state = {
    showJoinRoomForm: false,
    error: this.context.error
  }

  requestRoom = (displayName, conversationId) => {
    this.context.requestRoom(displayName, conversationId)
  }

  handleJoinRoom = () => {
    this.context.joinRoom()
  }

  handleToggleForm = () => {
    this.setState({ showJoinRoomForm: !this.state.showJoinRoomForm })
  }

  handleCancelJoinRoom = () => {
    this.context.clearUser()
  }

  renderHistory = (chatHistory, displayName) =>
    <Fragment>
      <TextHeader
        border
        size={3}
      >
        Chat history
      </TextHeader>
      <Spacer noX>
        <div className={styles['history']}>
          {
            chatHistory.map((item, index) => (
              <MessageItem
                isOutgoing={item.user === displayName}
                key={`${item.message}${index}`}
                message={item.message}
                type={item.type}
                user={item.user}
              />
            ))
          }
        </div>
      </Spacer>
    </Fragment>

  renderJoinRoomForm = (conversationId, displayName, chatHistory, error) =>
    <Fragment>
      {
        error &&
        <div className={styles['error']}>
          {error}
        </div>
      }
      {!!chatHistory.length && this.renderHistory(chatHistory, displayName)}
      <Spacer noX>
        <Button
          onClick={this.handleJoinRoom}
          text={`Join conversation ${conversationId} as ${displayName}?`}
          dark
          width={'100%'}
        />
      </Spacer>
      <Spacer noX>
        <Button
          onClick={this.handleCancelJoinRoom}
          text={'Cancel'}
          red
          width={'100%'}
        />
      </Spacer>
    </Fragment>

  renderLoginForm = () => {
    if (this.state.showJoinRoomForm) {
      return (
        <Spacer noX>
          <JoinRoomForm
            onSubmit={this.requestRoom}
            onCancel={this.handleToggleForm}
          />
        </Spacer>
      )
    }

    return (
      <Spacer noX>
        <Button
          dark
          onClick={this.handleToggleForm}
          text={'Start chatting'}
          width={'100%'}
        />
      </Spacer>
    )
  }

  render() {
    const {
      conversationId,
      displayName,
      error,
      chatHistory
    } = this.context

    return (
      <Container background='white'>
        <Spacer>
          <TextHeader
            border
            size={2}
          >
            A quick chat application for Twilio
          </TextHeader>
          <div>
            <div className={styles['form-wrapper']}>
              {
                displayName && conversationId && chatHistory
                  ? this.renderJoinRoomForm(conversationId, displayName, chatHistory, error)
                  : this.renderLoginForm()
              }
            </div>
          </div>
        </Spacer >
      </Container >
    )
  }
}
