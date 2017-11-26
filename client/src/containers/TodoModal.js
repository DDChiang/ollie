import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Radium from 'radium';

import AddTodo from '../components/AddTodo';
import EditTodo from '../components/EditTodo';

@Radium
export class TodoModal extends Component {
  render() {
    const { modal: { modalType } } = this.props;

    switch(modalType) {
      case 'createTodo':
        return <AddTodo />;
      case 'editTodo':
        return <EditTodo />
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
