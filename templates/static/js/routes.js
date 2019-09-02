import React from 'react';
import { HashRouter, Route, hashHistory } from 'react-router-dom';
import Dashboard from './containers/Dashboard';

export default (
    <HashRouter history={hashHistory}>
     <div>
      <Route exact path='/' component={Dashboard} />
     </div>
    </HashRouter>
);
