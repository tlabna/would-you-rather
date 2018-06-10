import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Navigation } from 'components'
import { container, innerContainer } from './styles.css'
import { connect } from 'react-redux'

class MainContainer extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
    isAuthed: PropTypes.bool.isRequired,
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

function mapStateToProps({ users }) {
  return {
    isAuthed: users.isAuthed,
  }
}

export default connect(mapStateToProps)(MainContainer)
