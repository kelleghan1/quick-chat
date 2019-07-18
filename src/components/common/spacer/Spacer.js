import PropTypes from 'prop-types'
import React from 'react'
import styles from './spacer.module.scss'

const Container = ({ children }) => (
  <div className={`${styles['spacer']}`}>
    {children}
  </div>
)

Container.propTypes = {
  children: PropTypes.node.isRequired
}

export default Container
