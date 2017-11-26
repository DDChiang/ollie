import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import Radium from 'radium';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import InputElement from './InputElement';
import Modal from './Modal';
import { saveTodo } from '../actions/todoActions';

@Radium
export class EditTodo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.id,
      value: props.value,
    }
  }

  _saveTodo = () => {
    const {
      id,
      value,
    } = this.state;

    this.props.dispatchSaveTodo({
      id,
      value,
    });
  }

  _handleOnInput = (value) => {
    this.setState({
      value,
    });
  }

  render() {
    return (
      <Modal
        defaultAction={ this._saveTodo }
        defaultActionText="Save"
      >
        <InputElement
          value={ this.state.value }
          handleChange={ this._handleOnInput }
          handleEnterPress={ this._saveTodo }
        />
      {
        /* Not closing modal when "enter" key is pressed
        since there will be more "edit" options available
        */
      }
      <button>Schedule/Change Date</button>
      <button>Set Recurring</button>
      <button>Add Label</button>
      <button>Add to Project</button>
      <button>Mark as Done</button>
      </Modal>
    );
  }
}

EditTodo.defaultProps = {

};

EditTodo.propTypes = {

};

const mapStateToProps = (state) => {
  return {
    value: _.get(state.modal.modalData, 'value', ''),
    id: _.get(state.modal.modalData, 'id', ''),
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    dispatchSaveTodo: saveTodo,
  }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditTodo);
