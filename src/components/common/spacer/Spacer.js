import PropTypes from 'prop-types'
import React from 'react'
import styles from './spacer.module.scss'

const Container = ({
  children,
  noX,
  noY
}) => {
  let className = styles['spacer']

  if (noX) className += ` ${styles['no-x']}`
  if (noY) className += ` ${styles['no-y']}`

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
