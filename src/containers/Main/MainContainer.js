import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { container, innerContainer } from './styles.css'

export default class MainContainer extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
  }

  render() {
    return (
      <div className={container}>
        <div className={innerContainer}>{this.props.children}</div>
      </div>
    )
  }
}
