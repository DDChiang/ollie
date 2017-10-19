import React, { Component } from 'react';
import Radium from 'radium';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-dnd';

import TodoItem from '../components/TodoItem';

import {
  deleteTodo,
  fetchTodoList,
} from '../actions/todoActions';
import {
  setModal,
} from '../actions/modalActions';
import TodoModal from './TodoModal';


@DragDropContext(HTML5Backend)
@Radium
export class TodoContainer extends Component {
  state = {
    todos: [],
  }

  componentWillMount() {
    this.props.dispatchFetchTodoList();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      todos: nextProps.todos
    });
  }

  _moveTodo = (currIndex, newIndex) => {
    const { todos } = this.state;
    const dragTodo = todos[currIndex];

    this.setState(
      update(this.state, {
        todos: {
          $splice: [[currIndex, 1], [newIndex, 0, dragTodo]]
        }
      })
    );
  }

  triggerAddTodoModal = () => {
    this.props.dispatchSetModal('addTodo');
  };

  _triggerEditTodoModal = (todoItemData) => {
    this.props.dispatchSetModal('editTodo', todoItemData);
  }

  deleteTodo = (id) => {
    this.props.dispatchDeleteTodo(id);
  }

  editTodo = (id, val) => {
    this.props.dispatchSetModal('editTodo');
  }

  render() {
    const { todos } = this.state;

    return (
      <div>
        <button
          onClick={ this.triggerAddTodoModal }
          style={ style.addButton }
        >
          Add Todo
        </button>
        {
          todos.map((todo, ind) => (
            <TodoItem
              index={ ind }
              key={ todo.id }
              { ...todo }
              deleteTodo={ this.deleteTodo }
              triggerEditTodoModal={ this._triggerEditTodoModal }
              moveTodo={ this._moveTodo }
            />
          ))}
        <TodoModal />
      </div>
    );
  }
}

const style = {
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
    dispatchDeleteTodo: deleteTodo,
    dispatchFetchTodoList: fetchTodoList,
    dispatchSetModal: setModal,
  }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoContainer);
