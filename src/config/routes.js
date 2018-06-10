import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import { MainContainer, HomeContainer } from 'containers'

export default function getRoutes(checkAuth, history) {
  return (
    <Router history={history}>
      <MainContainer>
        <Switch>
          <Route exact={true} path="/" component={HomeContainer} />
        </Switch>
      </MainContainer>
    </Router>
  )
}
