import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class MainContainer extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
  }

  render() {
    return (
      <div>
        {'MainContainer'}
        <div>{this.props.children}</div>
      </div>
    )
  }
}
