import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import InputElement from './InputElement';
import { createTodo } from '../actions/todoActions';

@Radium
export class AddTodoBlock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: props.editMode || false,
      value: '',
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.editMode && !nextProps.editMode) {
      this._resetEditMode();
    }
  }

  _cancelEditState = (e) => {
    const { addToTop, handleClose } = this.props;

    if (addToTop) {
      handleClose();
    }

    this._resetEditMode();
  }

  _createTodo = (value) => {
    const { addToTop, dispatchCreateTodo } = this.props
    const todoVal = value.length ? value : this.state.value;

    if (!todoVal.trim().length) {
      this._cancelEditState();
      return;
    }

    dispatchCreateTodo({
      todoVal,
      addToTop,
    });

    this._resetEditMode();
  }

  _handleInputChange = (value) => {
    this.setState({
      value,
    });
  }

  _resetEditMode() {
    this.setState({
      editMode: false,
      value: '',
    });
  }

  _triggerEditState = (e) => {
    e.stopPropagation();

    if (!this.state.editMode) {
      this.setState({
        editMode: true
      });
      // tell parent container
      if (!this.props.addToTop) {
        this.props.setEditMode();
      }
    }
  }

  _renderEditContent() {
    // TODO: if click out of it, create todo if there is a value
    return (
      <div>
        <InputElement
          value={ this.state.value }
          handleChange={ this._handleInputChange }
          handleEnterPress={ this._createTodo }
        />
        <button onClick={ this._createTodo }>Create</button>
        <button onClick={ this._cancelEditState }>X</button>
      </div>
    );
  }

  render() {
    return (
      <div
        style={ style.container }
        onClick={ this._triggerEditState }
      >
        {
          this.state.editMode
            ? this._renderEditContent()
            : 'Create Todo +'
        }
      </div>
    );
  }
}

const style = {
  container: {
    border: '1px solid grey',
    padding: '12px',
    flex: 1,
    minWidth: '135px',
    minHeight: '48px',
    marginTop: '6px',
    marginBottom: '6px',
    cursor: 'pointer',
    ':hover': {
      border: '1px solid red',
    }
  },
};

AddTodoBlock.defaultProps = {
  addToTop: false,
  editMode: false,
  setEditMode: () => {},
  handleClose: () => {},
};
AddTodoBlock.propTypes = {
  addToTop: PropTypes.bool,
  editMode: PropTypes.bool,
  setEditMode: PropTypes.func,
  handleClose: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    dispatchCreateTodo: createTodo,
  }, dispatch);
};

export default connect(
  null,
  mapDispatchToProps
)(AddTodoBlock);
