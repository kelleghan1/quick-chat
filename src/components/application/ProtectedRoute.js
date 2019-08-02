import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { ChatContext } from '../providers/ChatProvider'
import { Redirect, Route } from 'react-router-dom'

export default class PrivateRoute extends Component {
  static contextType = ChatContext;

  getRoute = newProps => {
    const {
      protectedComponent: Component
    } = this.props

    const {
      displayName,
      conversationId,
      isLoggedIn
    } = this.context

    const isEntitled =
      displayName &&
      conversationId &&
      isLoggedIn

    if (isEntitled) return <Component {...newProps} />

    return (
      <Redirect
        to={{
          pathname: '/'
        }}
      />
    )
  }

  render() {
    const { ...rest } = this.props

    return (
      <Route
        {...rest}
        render={this.getRoute}
      />
    )
  }
}

PrivateRoute.propTypes = {
  entitledRoles: PropTypes.arrayOf(PropTypes.string.isRequired),
  protectedComponent: PropTypes.func.isRequired
}

PrivateRoute.defaultProps = {
  entitledRoles: []
}
