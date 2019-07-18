import Loading from '../common/loading/Loading'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { ChatContext } from '../providers/AccountProvider'
import { Redirect, Route } from 'react-router-dom'
import { USER_ACTIONS } from '../../utils/constants'

export default class PrivateRoute extends Component {
  static contextType = ChatContext;

  state = { isLoading: true }

  componentDidMount() {
    this.context.requestAuthenticateUser()
      .then(() => {
        this.setState({ isLoading: false })
      })
  }

  getRoute = newProps => {
    const {
      entitledRoles,
      protectedComponent: Component
    } = this.props

    const {
      user,
      isLoading,
      isLoggedIn
    } = this.context

    const { roles } = user || {}

    const hasEntitledRoles = roles && entitledRoles.length
      ? !!entitledRoles.filter(item => roles[item]).length
      : true

    const isEntitled = isLoggedIn && hasEntitledRoles

    if (isLoading) return null
    if (isEntitled) return <Component {...newProps} />

    return (
      <Redirect
        to={{
          pathname: '/',
          state: {
            activatingModal: USER_ACTIONS.login,
            from: newProps.location.pathname
          }
        }}
      />
    )
  }

  render() {
    const { ...rest } = this.props

    if (this.state.isLoading) return <Loading />

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
