import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
} from 'redux';

import reducers from '../reducers';

const hasReduxDevTools = process.env.HAS_REDUX_DEV_TOOLS;

export default createStore(
  combineReducers({
    ...reducers
  }),
  compose(
    // applyMiddleware(),
    // If you are using the devToolsExtension, you can add it here also
    (typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' && hasReduxDevTools) ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
  )
);
