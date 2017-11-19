import thunkMiddleware from 'redux-thunk';
import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
} from 'redux';
import {
  routerReducer,
  routerMiddleware,
} from 'react-router-redux';
import reducers from '../reducers';
import createHistory from 'history/createBrowserHistory';

const history = createHistory();
const hasReduxDevTools = process.env.HAS_REDUX_DEV_TOOLS;

export default createStore(
  combineReducers({
    ...reducers,
    router: routerReducer,
  }),
  compose(
    applyMiddleware(
      thunkMiddleware,
      routerMiddleware(history)
    ),
    // If you are using the devToolsExtension, you can add it here also
    (typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' && hasReduxDevTools) ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
  )
);
