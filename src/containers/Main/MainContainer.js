import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Navigation } from 'components'
import { container, innerContainer } from './styles.css'

export default class MainContainer extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
    isAuthed: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    isAuthed: false,
  }

  render() {
    return (
      <div className={container}>
        <Navigation isAuthed={this.props.isAuthed} />
        <div className={innerContainer}>{this.props.children}</div>
      </div>
    )
  }
}
