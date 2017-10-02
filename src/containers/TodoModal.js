import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Radium from 'radium';

import { closeModal } from '../actions/modalActions';
import Modal from './Modal';
import AddTodo from '../components/AddTodo';

@Radium
export class TodoModal extends Component {
  _renderModal(modal) {
    switch(modal) {
      case 'addTodo':
        return <AddTodo />;
    }
  }

  render() {
    const { modal } = this.props;

    if (!modal) {
      return null;
    }

    return (
      <Modal>
        { this._renderModal(modal) }
      </Modal>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    modal: state.modal,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    dispatchCloseModal: closeModal,
  }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoModal);
