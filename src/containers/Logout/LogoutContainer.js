import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Logout } from 'components'
import { logoutAndUnauth } from 'redux/reducers/users'

class LogoutContainer extends Component {
  static propTypes = {
    logoutAndUnauth: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.logoutAndUnauth()
  }

  render() {
    return <Logout />
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logoutAndUnauth: () => dispatch(logoutAndUnauth()),
  }
}

export default connect(
  null,
  mapDispatchToProps
)(LogoutContainer)
