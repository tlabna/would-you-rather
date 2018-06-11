import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { checkIfAuthed } from './auth'

export default (BaseComponent, store) => {
  class Restricted extends React.Component {
    static propTypes = {
      location: PropTypes.object.isRequired,
    }

    state = {
      location: null,
    }

    static getDerivedStateFromProps(nextProps, prevState) {
      if (prevState.location !== nextProps.location) {
        return {
          location: nextProps.location,
        }
      }
      // Return null to indicate no change to state.
      return null
    }

    componentDidMount() {
      this.checkAuthentication(this.props)
    }

    componentDidUpdate(nextProps) {
      this.checkAuthentication(nextProps)
    }

    checkAuthentication(props) {
      if (store.getState().users.isFetching === true) {
        return
      }

      const { history } = props
      const nextPathName = history.location.pathname
      const isAuthed = checkIfAuthed(store)

      if (nextPathName === '/' || nextPathName === '/auth') {
        if (isAuthed === true) {
          history.replace({ pathname: '/results' })
        }
      } else {
        if (isAuthed !== true) {
          history.replace({ pathname: '/auth' })
        }
      }
    }

    render() {
      return <BaseComponent {...this.props} />
    }
  }

  return withRouter(Restricted)
}
