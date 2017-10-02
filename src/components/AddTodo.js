import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Radium from 'radium';

import { addTodo } from '../actions/todoActions';

@Radium
export class AddTodo extends Component {
  state = {
    value: '',
  }

  _addTodo = () => {
    this.props.dispatchAddTodo(this.state.value);
  }

  _handleOnInput = (e) => {
    this.setState({
      value: e.target.value,
    });
  }

  render() {
    return (
      <div>
        <input
          value={ this.state.value }
          onInput={ this._handleOnInput }
        />
        <button onClick={ this._addTodo }>
          Add Todo
        </button>
      </div>
    );
  }
}

AddTodo.defaultProps = {

};

AddTodo.propTypes = {

};


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    dispatchAddTodo: addTodo,
  }, dispatch);
};

export default connect(
  null,
  mapDispatchToProps
)(AddTodo);
