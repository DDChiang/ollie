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

  _createTodo = (value) => {
    const { addToTop, dispatchCreateTodo } = this.props
    const todoVal = value.length ? value : this.state.value;

    // Dispatch create Todo
    if (todoVal.trim().length) {
      dispatchCreateTodo({
        todoVal,
        addToTop,
      });
    }

    this.setState({
      editMode: false,
      value: '',
    });
  }

  _handleInputChange = (value) => {
    this.setState({
      value,
    });
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
      </div>
    );
  }

  _triggerEditState = () => {
    if (!this.state.editMode) {
      this.setState({
        editMode: true
      });
    }
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
};
AddTodoBlock.propTypes = {
  addToTop: PropTypes.bool,
  editMode: PropTypes.bool,
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
