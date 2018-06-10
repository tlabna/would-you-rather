import React from 'react'
import ReactDOM from 'react-dom'
import getRoutes from 'config/routes'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import * as reducers from 'redux/reducers'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()
// Build the middleware for intercepting and dispatching navigation actions
const historyMiddleware = routerMiddleware(history)

// create state tree from suplied reducers
const store = createStore(
  combineReducers({ ...reducers, routing: routerReducer }),
  compose(
    applyMiddleware(thunk, historyMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : (f) => f
  )
)

function checkAuth(nextState, replace) {
  return true
}

ReactDOM.render(
  <Provider store={store}>{getRoutes(checkAuth, history)}</Provider>,
  document.getElementById('app')
)
