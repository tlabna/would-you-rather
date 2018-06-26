import { listenToDecisions, fetchSingleDecision } from 'helpers/api'
import { addListener } from 'redux/reducers/listeners'
import { addUser } from 'redux/reducers/users'

const ADD_DECISION = 'ADD_DECISION'
const SETTING_DECISIONS_LISTENER = 'SETTING_DECISIONS_LISTENER'
const SETTING_DECISIONS_LISTENER_ERROR = 'SETTING_DECISIONS_LISTENER_ERROR'
const SETTING_DECISIONS_LISTENER_SUCCESS = 'SETTING_DECISIONS_LISTENER_SUCCESS'

function settingDecisionsListener() {
  return {
    type: SETTING_DECISIONS_LISTENER,
  }
}

function settingDecisionsListenerError(error) {
  return {
    type: SETTING_DECISIONS_LISTENER_ERROR,
    error: error,
  }
}

function settingDecisionsListenerSuccess(data) {
  return {
    type: SETTING_DECISIONS_LISTENER_SUCCESS,
    data,
    timestamp: Date.now(),
  }
}

export function setAndHandleDecisionsListener() {
  return function(dispatch, getState) {
    if (getState().listeners.decisions === true) {
      return
    }

    dispatch(addListener('decisions'))
    dispatch(settingDecisionsListener())

    listenToDecisions(
      (decisions) => {
        dispatch(settingDecisionsListenerSuccess(decisions))
        Object.keys(decisions).map((decisionId) =>
          dispatch(addUser(decisions[decisionId].author))
        )
      },
      (error) => dispatch(settingDecisionsListenerError(error))
    )
  }
}

function addDecision(decisionId, decision) {
  return {
    type: ADD_DECISION,
    decisionId,
    decision,
  }
}

export function fetchAndHandleSingleDecision(decisionId) {
  return function(dispatch) {
    fetchSingleDecision(decisionId)
      .then((decision) => dispatch(addDecision(decisionId, decision)))
      .catch((error) => console.warn('Error fetching decision', error))
  }
}

const initialState = {
  lastUpdated: 0,
  isFetching: true,
  error: '',
  decisions: {},
}

export default function decisions(state = initialState, action) {
  switch (action.type) {
    case SETTING_DECISIONS_LISTENER:
      return {
        ...state,
        isFetching: true,
      }
    case SETTING_DECISIONS_LISTENER_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }
    case SETTING_DECISIONS_LISTENER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        decisions: {
          ...state.decisions,
          [action.decisionId]: action.decision,
        },
      }
    case ADD_DECISION:
      return {
        ...state,
        isFetching: false,
        decisions: {
          ...state.decisions,
          [action.decisionId]: action.decision,
        },
      }
    default:
      return state
  }
}
