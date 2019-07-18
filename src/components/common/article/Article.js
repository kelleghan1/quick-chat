import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import styles from './article.module.scss'

class Article extends PureComponent {
  render () {
    return (
      <article className={styles['article']}>
        {this.props.children}
      </article>
    )
  }
}

Article.propTypes = {
  children: PropTypes.string.isRequired
}

export default Article
