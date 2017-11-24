import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { createTodoList } from '../actions/todoListActions';

@Radium
export class AddListBlock extends Component {
  state = {
    userIsEditing: false,
    value: '',
  }

  _createList = () => {
    console.log('crete list');
    const { value } = this.state;

    // Close
    this.setState({
      userIsEditing: false,
      value: '',
    });

    // Dispatch create list
    if (value.trim().length) {
      this.props.dispatchCreateTodoList(value);
    }
  }

  _handleInputChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  }

  _handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      this._createList();
    }
  }

  _renderEditContent() {
    return (
      <div>
        <input
          type="text"
          value={ this.state.value }
          onChange={ this._handleInputChange }
          onKeyDown={ this._handleKeyPress }
          autoFocus
        />
        <button onClick={ this._createList }>Create</button>
      </div>
    );
  }

  _triggerEditState = () => {
    if (!this.state.userIsEditing) {
      this.setState({
        userIsEditing: true
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
          this.state.userIsEditing
            ? this._renderEditContent()
            : 'Create List +'
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

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    dispatchCreateTodoList: createTodoList,
  }, dispatch);
};

export default connect(
  null,
  mapDispatchToProps
)(AddListBlock);
