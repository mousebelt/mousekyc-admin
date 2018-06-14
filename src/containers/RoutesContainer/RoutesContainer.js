import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { Switch, Route, Redirect } from 'react-router-dom';

import SignInContainer from 'containers/SignInContainer/SignInContainer';
import MatchContainer from 'containers/MatchContainer/MatchContainer';

class RoutesContainer extends PureComponent {

  componentWillMount() {
  }

  componentWillReceiveProps(newProps) {
  }

  render () {
    return (
      <Switch>
        <Route exact path="/signin" component={SignInContainer}/>
        <Route exact path="/match" component={MatchContainer}/>
        <Route path="/" component={SignInContainer}/>
        <Redirect to="/404"/>
      </Switch>
    )
  }
}

export default RoutesContainer;