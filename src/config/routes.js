import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Router } from 'react-router'
import {
  MainContainer,
  HomeContainer,
  AuthenticateContainer,
  ResultsContainer,
  DecideContainer,
} from 'containers'

export default function getRoutes(checkAuth, history) {
  return (
    <Router history={history}>
      <MainContainer>
        <Switch>
          <Route exact={true} path="/" component={checkAuth(HomeContainer)} />
          <Route path="/auth" component={checkAuth(AuthenticateContainer)} />
          <Route path="/results" component={checkAuth(ResultsContainer)} />
          <Route
            path="/decide/:decisionId"
            component={checkAuth(DecideContainer)}
          />
        </Switch>
      </MainContainer>
    </Router>
  )
}
