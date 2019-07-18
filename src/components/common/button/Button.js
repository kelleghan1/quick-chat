import PropTypes from 'prop-types'
import React from 'react'
import styles from './button.module.scss'
import { Link } from 'react-router-dom'

const Button = ({
  blue,
  disabled,
  imageLeft,
  image,
  greenLight,
  borderBottomLeftRadius,
  borderBottomRightRadius,
  borderRadius,
  borderTopLeftRadius,
  borderTopRightRadius,
  dark,
  // draftkings,
  // fanduel,
  plain,
  // fangraphs,
  // fantasydraft,
  height,
  leftSpacing,
  link,
  light,
  onClick,
  redDark,
  text,
  width,
  yahoo
}) => {
  let classNames = `${styles['button']}`
  const imageClass = imageLeft ? 'image-left' : ''

  if (blue) classNames += ` ${styles['blue']}`
  if (borderBottomLeftRadius) classNames += ` ${styles['border-bottom-left-radius']}`
  if (borderBottomRightRadius) classNames += ` ${styles['border-bottom-right-radius']}`
  if (borderRadius) classNames += ` ${styles['border-radius']}`
  if (borderTopLeftRadius) classNames += ` ${styles['border-top-left-radius']}`
  if (borderTopRightRadius) classNames += ` ${styles['border-top-right-radius']}`
  if (dark) classNames += ` ${styles['dark']}`
  if (greenLight) classNames += ` ${styles['greenLight']}`
  if (image) classNames += ` ${styles['max-height']}`
  if (leftSpacing) classNames += ` ${styles['left-spacing']}`
  if (light) classNames += ` ${styles['light']}`
  if (plain) classNames += ` ${styles['plain']}`
  if (redDark) classNames += ` ${styles['red-dark']}`

  const buttonStyle = {}
  if (height) buttonStyle.height = height
  if (width) buttonStyle.width = width

  if (link) {
    return (
      <button
        className={classNames}
        onClick={onClick}
        style={buttonStyle}
      >
        <Link to={link}>
          {text}
        </Link>
      </button>
    )
  }

  return (
    <button
      className={classNames}
      disabled={disabled}
      onClick={onClick}
      style={buttonStyle}
    >
      {text}
      {
        image &&
        <div className={`${styles['button-image']} ${styles[imageClass]}`}>
          {image}
        </div>
      }
    </button>
  )
}

Button.propTypes = {
  blue: PropTypes.bool,
  borderBottomLeftRadius: PropTypes.bool,
  borderBottomRightRadius: PropTypes.bool,
  borderRadius: PropTypes.bool,
  borderTopLeftRadius: PropTypes.bool,
  borderTopRightRadius: PropTypes.bool,
  dark: PropTypes.bool,
  disabled: PropTypes.bool,
  // draftkings: PropTypes.bool,
  // fanduel: PropTypes.bool,
  // fangraphs: PropTypes.bool,
  // fantasydraft: PropTypes.bool,
  greenLight: PropTypes.bool,
  height: PropTypes.string,
  image: PropTypes.node,
  imageLeft: PropTypes.bool,
  leftSpacing: PropTypes.bool,
  light: PropTypes.bool,
  link: PropTypes.string,
  onClick: PropTypes.func,
  plain: PropTypes.bool,
  redDark: PropTypes.bool,
  text: PropTypes.string.isRequired,
  width: PropTypes.string,
  yahoo: PropTypes.bool
}

export default Button
