import PropTypes from 'prop-types'
import React from 'react'
import styles from './spacer.module.scss'

const Container = ({
  children,
  inline,
  noLeft,
  noRight,
  noX,
  noY
}) => {
  let className = styles['spacer']

  if (noX) className += ` ${styles['no-x']}`
  if (noY) className += ` ${styles['no-y']}`
  if (noLeft) className += ` ${styles['no-left']}`
  if (noRight) className += ` ${styles['no-right']}`
  if (inline) className += ` ${styles['inline']}`

  return (
    <div className={className}>
      {children}
    </div>
  )
}

Container.propTypes = {
  children: PropTypes.node.isRequired
}

export default Container
