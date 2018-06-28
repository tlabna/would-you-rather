import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Decide } from 'components'
import { addAndHandleDecision } from 'redux/reducers/users'
import { fetchAndHandleSingleDecision } from 'redux/reducers/decisions'

class DecideContainer extends Component {
  static propTypes = {
    decisionNeedsFetching: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    decision: PropTypes.object.isRequired,
    usersDecision: PropTypes.object,
    onSelect: PropTypes.func.isRequired,
    fetchDecision: PropTypes.func.isRequired,
  }

  componentDidMount() {
    if (this.props.decisionNeedsFetching === true) {
      this.props.fetchDecision()
    }
  }

  render() {
    return <Decide {...this.props} />
  }
}

function mapStateToProps({ decisions, users }, { match }) {
  const decision = decisions.decisions[match.params.decisionId]

  return {
    isFetching: decisions.isFetching,
    decisionNeedsFetching: typeof decision === 'undefined',
    decision: decision || {},
    usersDecision: users[users.authedId].decisionsMade[match.params.decisionId],
  }
}

function mapDispatchToProps(dispatch, { match }) {
  return {
    onSelect: (option) =>
      dispatch(addAndHandleDecision(match.params.decisionId, option)),
    fetchDecision: () =>
      dispatch(fetchAndHandleSingleDecision(match.params.decisionId)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DecideContainer)
