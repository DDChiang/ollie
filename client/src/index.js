import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import {
  Router,
  HashRouter,
  // StaticRouter, // for server rendering
  Route,
  Link,
  Switch,
} from 'react-router-dom'
import createHistory from 'history/createBrowserHistory';

import Store from './store';

import App from './App';
import './styles/index.scss';

const history = createHistory();

render(
  <Provider store={ Store }>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,
  document.getElementById('root')
);
