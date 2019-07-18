import PropTypes from 'prop-types'
import React from 'react'
import styles from './container.module.scss'

const Container = ({ children, background }) => (
  <div className={`${styles['container']} ${background ? styles[background] : ''}`}>
    {children}
  </div>
)

Container.propTypes = {
  background: PropTypes.string,
  children: PropTypes.node.isRequired
}

export default Container
