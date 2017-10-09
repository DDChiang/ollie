import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Radium from 'radium';

import AddTodo from '../components/AddTodo';

@Radium
export class TodoModal extends Component {
  render() {
    const { modal } = this.props;

    switch(modal) {
      case 'addTodo':
        return <AddTodo />;
      default:
        return null;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    modal: state.modal,
  };
};

export default connect(
  mapStateToProps,
  null,
)(TodoModal);
