import PropTypes from 'prop-types'
import React, { Component, Fragment } from 'react'
import styles from './joinRoomForm.module.scss'
import Spacer from '../spacer/Spacer'
import Button from '../button/Button'

class JoinRoomForm extends Component {
  state = {
    displayName: '',
    error: '',
    roomId: ''
  }

  handleSubmit = event => {
    event.preventDefault()

    const {
      displayName,
      roomId
    } = this.state

    if (!displayName || !roomId) {
      this.setState({ error: 'Please enter a display name and a room ID' })

      return
    }

    this.props.onSubmit(displayName, roomId)
  }

  handleDisplayNameChange = event => {
    this.setState({
      error: null,
      displayName: event.target.value.trim()
    })
  }

  handleRoomIdChange = event => {
    this.setState({
      error: null,
      roomId: event.target.value.trim()
    })
  }

  render() {
    const {
      displayName,
      error,
      roomId
    } = this.state

    return (
      <Fragment>
        {
          error &&
          <div className={`${styles['error']} ${this.state.error ? styles['visible'] : ''}`}>
            {error}
          </div>
        }
        <form
          className={styles['join-room-form']}
          onSubmit={this.handleSubmit}
        >
          <Spacer>
            <Spacer noX>
              <label htmlFor='display-name-input'>Display Name</label>
              <input
                autoComplete='off'
                onChange={this.handleDisplayNameChange}
                id='display-name-input'
                type='text'
              />
            </Spacer>
            <Spacer noX>
              <label htmlFor='room-id-input'>Room ID</label>
              <input
                autoComplete='off'
                onChange={this.handleRoomIdChange}
                id='room-id-input'
                type='text'
              />
            </Spacer>
            <Spacer noX>
              <input
                className={styles['dark']}
                disabled={!displayName || !roomId}
                type='submit'
                value='Submit'
              />
            </Spacer>
            <Spacer noX>
              <Button
                onClick={this.props.onCancel}
                text={'Cancel'}
                red
                width={'100%'}
              />
            </Spacer>
          </Spacer>
        </form >
      </Fragment>
    )
  }
}

JoinRoomForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
}

export default JoinRoomForm