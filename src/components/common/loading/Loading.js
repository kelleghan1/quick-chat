import PropTypes from 'prop-types'
import React from 'react'
import styles from './loading.module.scss'

const Loading = ({
  text
}) =>
  <div className={styles['loading']}>
    {text}
    {
      <div className={styles['spinner']}>
        ...
      </div>
    }
  </div>

Loading.propTypes = {
  text: PropTypes.string
}

export default Loading
