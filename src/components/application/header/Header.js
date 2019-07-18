import Button from '../../common/button/Button'
import Container from '../../common/container/Container'
import React, { Component, Fragment } from 'react'
import Spacer from '../../common/spacer/Spacer'
import styles from './header.module.scss'
import { ChatContext } from '../../providers/ChatProvider'
import { Link } from 'react-router-dom'

export default class Header extends Component {
  static contextType = ChatContext;

  state = {}

  render() {
    const {
      isLoggedIn,
      user,
      requestLogout,
      requestLogin
    } = this.context


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
              <div className={styles['user-menu']}>
                {
                  isLoggedIn && user
                    ? (
                      <Fragment>
                        <div>
                          <Button
                            borderRadius
                            leftSpacing
                            onClick={requestLogout}
                            text='Log Out'
                          />
                        </div>
                      </Fragment>
                    ) : (
                      <div>
                        <Button
                          borderRadius
                          onClick={requestLogin}
                          text={'Login'}
                        />
                      </div>
                    )
                }
              </div>
            </div>
          </Spacer>
        </Container>
      </div>
    )
  }
}
