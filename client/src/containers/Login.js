import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom'

import { fetchUser } from '../actions/userActions';


export class LoginContainer extends Component {
  componentWillMount() {
    const {
      dispatchFetchUser,
    } = this.props;

    dispatchFetchUser();
  }
  render() {
    return (
      <div>
        <p>Login</p>
        <Link to="/todo">
          Follow me to Todos
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    dispatchFetchUser: fetchUser,
  }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginContainer);
