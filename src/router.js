import React from 'react';
import { Route, Switch } from 'react-router-dom';

// Components
import Dashboard from './components/Dashboard/Dashboard';
import Auth from './components/Auth/Auth';

export default (
  <Switch>
    <Route path='/dashboard' component={Dashboard}/>
    <Route path='/' component={Auth}/>
  </Switch>
)