import React from 'react';
import { HashRouter, Route, hashHistory } from 'react-router-dom';
import Home from './components/Home';

export default (
    <HashRouter history={hashHistory}>
     <div>
      <Route exact path='/' component={Home} />
     </div>
    </HashRouter>
)