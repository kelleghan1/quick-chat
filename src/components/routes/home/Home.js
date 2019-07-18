import Article from '../../common/article/Article'
import Container from '../../common/container/Container'
import PropTypes from 'prop-types'
import React, { Component, Fragment } from 'react'
import Spacer from '../../common/spacer/Spacer'
import TextHeader from '../../common/text-header/TextHeader'
import { ChatContext } from '../../providers/ChatProvider'

export default class Home extends Component {
  static contextType = ChatContext;

  static propTypes = {
    location: PropTypes.object
  }

  state = {}

  render() {
    return (
      <Fragment>
        <Container background='white'>
          <Spacer>
            <TextHeader
              border
              size={1}
            >
              Text Header
            </TextHeader>
            Home
          </Spacer>
        </Container>
      </Fragment>
    )
  }
}
