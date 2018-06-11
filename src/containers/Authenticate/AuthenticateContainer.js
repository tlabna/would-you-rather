import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Authenticate } from 'components'
import * as userActionCreators from 'redux/reducers/users'

class AuthenticateContainer extends Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.string,
    fetchAndHandleAuthedUser: PropTypes.func.isRequired,
  }

  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  handleAuth = (e) => {
    e.preventDefault()
    this.props
      .fetchAndHandleAuthedUser()
      // If user authenticated redirect to /results
      .then(() => this.context.router.history.replace('results'))
  }

  render() {
    return (
      <Authenticate
        isFetching={this.props.isFetching}
        error={this.props.error}
        onAuth={this.handleAuth}
      />
    )
  }
}

function mapStateToProps({ users }) {
  return {
    isFetching: users.isFetching,
    erros: users.errors,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(userActionCreators, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthenticateContainer)
