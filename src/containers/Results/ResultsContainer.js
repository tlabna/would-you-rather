import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import { Results } from 'components'
import { setAndHandleDecisionsListener } from 'redux/reducers/decisions'
import { decisionsAreStale } from 'helpers/utils'

class ResultsContainer extends Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    decisions: PropTypes.array.isRequired,
    lastUpdated: PropTypes.number.isRequired,
    setAndHandleDecisionsListener: PropTypes.func.isRequired,
  }

  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  componentDidMount() {
    if (decisionsAreStale(this.props.lastUpdated)) {
      this.props.setAndHandleDecisionsListener()
    }
  }

  render() {
    const { isFetching, error, decisions } = this.props
    return (
      <Results isFetching={isFetching} error={error} decisions={decisions} />
    )
  }
}

function mapStateToProps({ decisions, users }) {
  const allDecisions = decisions.decisions
  return {
    isFetching: decisions.isFetching,
    lastUpdated: decisions.lastUpdated,
    decisions: Object.keys(allDecisions)
      .sort((a, b) => allDecisions[b].timestamp - allDecisions[a].timestamp)
      .map((id) => allDecisions[id]),
    error: decisions.error,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setAndHandleDecisionsListener: () =>
      dispatch(setAndHandleDecisionsListener()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResultsContainer)
