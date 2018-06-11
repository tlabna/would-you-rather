import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Router } from 'react-router'
import { MainContainer, HomeContainer, AuthenticateContainer } from 'containers'

export default function getRoutes(checkAuth, history) {
  return (
    <Router history={history}>
      <MainContainer>
        <Switch>
          <Route exact={true} path="/" component={HomeContainer} />
          <Route path="/auth" component={AuthenticateContainer} />
        </Switch>
      </MainContainer>
    </Router>
  )
}
