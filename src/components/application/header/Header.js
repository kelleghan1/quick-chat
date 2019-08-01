import Button from '../../common/button/Button'
import Container from '../../common/container/Container'
import React, { Component } from 'react'
import Spacer from '../../common/spacer/Spacer'
import styles from './header.module.scss'
import { ChatContext } from '../../providers/ChatProvider'
import { Link } from 'react-router-dom'

export default class Header extends Component {
  static contextType = ChatContext;

  state = {}

  handleLogout = () => {
    this.context.logout()
  }

  render() {
    const { displayName, isLoggedIn } = this.context

    return (
      <div className={`${styles['header']}`}>
        <Container>
          <Spacer>
            <div className={styles['inner-header']}>
              <div className={`${styles['logo-wrapper']} ${styles['bold']}`}>
                <Link to='/'>
                  Quick Chat
                </Link>
              </div>
              {
                isLoggedIn &&
                <div className={styles['header-button']}>
                  <Button
                    onClick={this.handleLogout}
                    text={`Log out ${displayName}`}
                    height={'30px'}
                  />
                </div>
              }
            </div>
          </Spacer>
        </Container>
      </div>
    )
  }
}
