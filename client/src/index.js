import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import {
  Router,
  // StaticRouter, // for server rendering
  Route,
  Link,
  // Switch,
} from 'react-router-dom'
import {
  ConnectedRouter,
  push,
} from 'react-router-redux';

import createHistory from 'history/createBrowserHistory';

import Login from './containers/Login';
import TodoContainer from './containers/TodoContainer';
import TodoListsContainer from './containers/TodoListsContainer';
import Store from './store';

// test
import App from './App';
// import Tester from './testIndex';

import './styles/index.scss';

const history = createHistory();
//
// const NoMatch = () => {
//   return <p>No match</p>;
// };
//
// const SlugChildComponent = () => (
//   <div>SLUGG</div>
// )
//
// const Child = ({ match }) => (
//   <div>
//     Child { match.url }
//     <Link to={`${match.url}/randomTopic`}>
//       Random Topic
//     </Link>
//     <Link to={`${match.url}/random`}>
//       Random Topic
//     </Link>
//     <Route path={`${match.url}/:topicId`} component={Topic}/>
//     <Route exact path={match.url} render={() => (
//       <h3>Please select a topic.</h3>
//     )}/>
//   </div>
// );
//
// const Topic = ({ match }) => (
//   <div>
//     <h3>{match.params.topicId}</h3>
//   </div>
// )

render(
  <Provider store={ Store }>
    <ConnectedRouter history={ history }>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);

// render(
//   <Provider store={ Store }>
//     <Router history={ history }>
//       <div>
//         <Route path="/" component={ Login } />
//         <Route path="/todo" component={ TodoContainer } />
//         <Route path="/todolists" component={ TodoListsContainer } />
//         <Route path="/todolist" component={ Child } />
//       </div>
//     </Router>
//   </Provider>,
//   document.getElementById('root')
// );
