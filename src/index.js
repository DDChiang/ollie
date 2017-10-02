import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import {
  BrowserRouter as Router,
  StaticRouter, // for server rendering
  Route,
  Link
  // etc.
} from 'react-router-dom'

import Login from './containers/Login';
import TodoContainer from './containers/TodoContainer';

import Store from './store';

import '../styles/index.scss';

render(
  <Provider store={ Store }>
    <Router>
      <div>
        <Route exact path="/" component={ Login } />
        <Route exact path="/todo" component={ TodoContainer } />
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);
