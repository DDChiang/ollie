import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';
import {
  Link,
  Redirect,
  Route,
  Switch,
  withRouter,
} from 'react-router-dom'
import { connect } from 'react-redux';

import Login from './containers/Login';
import TodoListContainer from './containers/TodoListContainer';
import TodoListsContainer from './containers/TodoListsContainer';

// HOC - Restricted Wrapper that checks for logged in user
import Restricted from './components/Restricted';

const NoMatch = () => {
  return <p>No match</p>;
};

export const RouteConfigComponent = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/login" component={ Login } />
        <Route exact path="/todolists" component={ Restricted(TodoListsContainer) } />
        <Route exact path="/todolist/:id" component={ Restricted(TodoListContainer) } />
        <Route path="*" component={ Restricted(NoMatch) } />
      </Switch>
    </div>
  );
}
