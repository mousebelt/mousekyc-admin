import React, { PureComponent } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import SignInContainer from 'containers/SignInContainer/SignInContainer';
import DashboardContainer from 'containers/DashboardContainer/DashboardContainer';

class RoutesContainer extends PureComponent {

  componentWillMount() {
  }

  componentWillReceiveProps(newProps) {
  }

  render () {
    return (
      <Switch>
        <Route exact path="/signin" component={SignInContainer}/>
        <Route exact path="/dashboard" component={DashboardContainer}/>
        <Route path="/" component={SignInContainer}/>
        <Redirect to="/404"/>
      </Switch>
    )
  }
}

export default RoutesContainer;