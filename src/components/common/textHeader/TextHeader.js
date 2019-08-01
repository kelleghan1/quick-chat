import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import styles from './textHeader.module.scss'

class TextHeader extends PureComponent {
  getHeader = () => {
    const {
      children,
      size
    } = this.props

    const sizeMap = {
      1: <h1>{children}</h1>,
      2: <h2>{children}</h2>,
      3: <h3>{children}</h3>
    }

    return sizeMap[size]
  }

  render() {
    let className = styles['text-header']

    if (this.props.border) className += ` ${styles['border']}`

    return (
      <div className={className}>
        {this.getHeader()}
      </div>
    )
  }
}

TextHeader.propTypes = {
  border: PropTypes.bool,
  children: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired
}

export default TextHeader
