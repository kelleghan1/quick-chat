import PropTypes from 'prop-types'
import React from 'react'
import styles from './button.module.scss'

const Button = ({
  blue,
  borderRadius,
  dark,
  disabled,
  height,
  onClick,
  red,
  text,
  width
}) => {
  let classNames = `${styles['button']}`

  if (blue) classNames += ` ${styles['blue']}`
  if (red) classNames += ` ${styles['red']}`
  if (dark) classNames += ` ${styles['dark']}`
  if (borderRadius) classNames += ` ${styles['border-radius']}`

  const buttonStyle = {}

  if (height) buttonStyle.height = height
  if (width) buttonStyle.width = width

  return (
    <button
      className={classNames}
      disabled={disabled}
      onClick={onClick}
      style={buttonStyle}
    >
      {text}
    </button>
  )
}

Button.propTypes = {
  blue: PropTypes.bool,
  borderRadius: PropTypes.bool,
  dark: PropTypes.bool,
  disabled: PropTypes.bool,
  height: PropTypes.string,
  onClick: PropTypes.func,
  red: PropTypes.bool,
  text: PropTypes.string.isRequired,
  width: PropTypes.string
}

export default Button
