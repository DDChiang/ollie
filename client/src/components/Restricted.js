import React, { Component } from 'react';
import PropTypes from 'prop-types';

// TEST
import { withRouter } from 'react-router-dom';

export default (BaseComponent) => {
  class Restricted extends Component {
    componentWillMount() {
      this.checkAuthentication(this.props);
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.location !== this.props.location) {
        this.checkAuthentication(nextProps);
      }
    }

    checkAuthentication(params) {
      const { history } = params;

      console.log(params);
      // TODO: Do your check here
      // history.replace({ pathname: '/login' });
    }

    render() {
      return <BaseComponent {...this.props} />;
    }
  }

  return withRouter(Restricted);
}
