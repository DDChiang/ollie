import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import {
  // BrowserRouter,
  Router,
  HashRouter,
  // StaticRouter, // for server rendering
  Route,
  Link,
  Switch,
} from 'react-router-dom'
import {
  ConnectedRouter,
  push,
} from 'react-router-redux';

import createHistory from 'history/createBrowserHistory';

import Login from './containers/Login';
import TodoListContainer from './containers/TodoListContainer';
import TodoListsContainer from './containers/TodoListsContainer';
import Store from './store';

// test
import App, { RouteConfigComponent, AppContainer } from './App';
// import Tester from './testIndex';

import './styles/index.scss';

const history = createHistory();

// render(
//   <Provider store={ Store }>
//     <ConnectedRouter history={ history }>
//       <App />
//     </ConnectedRouter>
//   </Provider>,
//   document.getElementById('root')
// );
//
render(
  <Provider store={ Store }>
    <HashRouter>
      <RouteConfigComponent />
    </HashRouter>
  </Provider>,
  document.getElementById('root')
);
