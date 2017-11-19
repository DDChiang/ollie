import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';
import {
  Route,
  Switch,
} from 'react-router-dom'
import { connect } from 'react-redux';

import Login from './containers/Login';
import TodoContainer from './containers/TodoContainer';
import TodoListsContainer from './containers/TodoListsContainer';

const NoMatch = () => {
  return <p>No match</p>;
};

const RouteConfigComponent = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/todo" component={ TodoContainer } />
        <Route exact path="/todolists" component={ TodoListsContainer } />
        <Route path="*" component={ NoMatch } />
      </Switch>
    </div>
  )
}

@Radium
export class AppContainer extends Component {
  render() {
    return !this.props.isAuthenticated ?
      <RouteConfigComponent path={ this.props.location } />
      : <Route exact path="/" component={ Login } />
  }
}

AppContainer.defaultProps = {};
AppContainer.propTypes = {};

export default connect(state => ({
  location: state.location,
  isAuthenticated: state.isAuthenticated,
}))(AppContainer)
