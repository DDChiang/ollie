import React, { Component } from 'react';
import Radium from 'radium';
import HTML5Backend from 'react-dnd-html5-backend';
import _ from 'lodash';
// import update from 'immutability-helper'; // This might be useful in the future
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-dnd';

import AddTodoBlock from '../components/AddTodoBlock';
import TodoItem from '../components/TodoItem';
import TodoModal from './TodoModal';
import {
  fetchTodoList,
} from '../actions/todoActions';

@DragDropContext(HTML5Backend)
@Radium
export class TodoListContainer extends Component {
  state = {
    todos: [],
    showAddTodoTop: false,
    bottomAddTodoEditMode: false,
    // first load?
  }

  componentWillMount() {
    this.props.dispatchFetchTodoList();
  }

  componentWillReceiveProps(nextProps) {
    const currentTodos = this.props.todos;
    const newTodos = nextProps.todos;

    if (!_.isEqual(newTodos, currentTodos)) {
      this.setState({
        todos: newTodos,
      });
      // sep out to diff condition?
      this._resetEditMode();
    }
  }

  _triggerRenderAddTodoTop = (e) => {
    e.stopPropagation();

    this.setState({
      showAddTodoTop: true,
      bottomAddTodoEditMode: false,
    });
  }

  _resetEditMode = () => {
    this.setState({
      showAddTodoTop: false,
      bottomAddTodoEditMode: false,
    });
  }

  _setBottomAddTodoEditMode = () => {
    this.setState({
      bottomAddTodoEditMode: true,
    });
  }

  _renderAddTodoTop() {
    const { showAddTodoTop } = this.state;

    if (showAddTodoTop) {
      return (
        <AddTodoBlock
          addToTop
          editMode
          handleClose={ this._resetEditMode }
        />
      );
    }
  }

  _renderAddTodoBottom() {
    const {
      showAddTodoTop,
      bottomAddTodoEditMode,
    } = this.state;

    if (!showAddTodoTop) {
      return (
        <AddTodoBlock
          editMode={ bottomAddTodoEditMode }
          setEditMode={ this._setBottomAddTodoEditMode }
        />
      // need to change how "setEditMode" works
      );
    }
  }

  _renderTodos() {
    return this.props.todos.map((todo, ind) => (
      <TodoItem
        index={ ind }
        key={ todo.id }
        { ...todo }
      />
    ));
  }

  render() {
    const {
      showAddTodoTop,
      todos
    } = this.state;

    return (
      <div
        style={ style.container }
        onClick={ this._resetEditMode }
      >
        <button
          onClick={ this._triggerRenderAddTodoTop }
          style={ style.addButton }
        >
          Add Todo
        </button>
        { this._renderAddTodoTop() }
        { this._renderTodos() }
        { this._renderAddTodoBottom() }
        <TodoModal />
      </div>
    );
  }
}

const style = {
  container: {
    width: '100%',
    maxWidth: '800px',
    background: 'grey',
  },
  addButton: {
    background: 'rgba(0,0,0,0.2)',
    width: '100px',
  },
};

const mapStateToProps = (state) => {
  return {
    todos: state.todos,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    dispatchFetchTodoList: fetchTodoList,
  }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoListContainer);
