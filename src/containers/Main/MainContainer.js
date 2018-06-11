import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Navigation } from 'components'
import { container, innerContainer } from './styles.css'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActionCreators from 'redux/reducers/users'
import { withRouter } from 'react-router-dom'

class MainContainer extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
    isAuthed: PropTypes.bool.isRequired,
    removeFetchingUser: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.removeFetchingUser()
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators(userActionCreators, dispatch)
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(MainContainer)
)
