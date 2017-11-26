// TODO: rename to TodoListContainer

import React, { Component } from 'react';
import Radium from 'radium';
import HTML5Backend from 'react-dnd-html5-backend';
// import update from 'immutability-helper'; // This might be useful in the future
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
import AddTodoBlock from '../components/AddTodoBlock';

@DragDropContext(HTML5Backend)
@Radium
export class TodoListContainer extends Component {
  state = {
    todos: [],
    showAddTodoTop: false,
  }

  componentWillMount() {
    this.props.dispatchFetchTodoList();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      todos: nextProps.todos,
      showAddTodoTop: false,
    });
  }

  // triggerAddTodoModal = () => {
  //   this.props.dispatchSetModal('createTodo');
  // };

  _triggerEditTodoModal = (todoItemData) => {
    this.props.dispatchSetModal('editTodo', todoItemData);
  }

  deleteTodo = (id) => {
    this.props.dispatchDeleteTodo(id);
  }

  editTodo = (id, val) => {
    this.props.dispatchSetModal('editTodo');
  }

  _renderTodos() {
    return this.props.todos.map((todo, ind) => (
      <TodoItem
        index={ ind }
        key={ todo.id }
        { ...todo }
        deleteTodo={ this.deleteTodo }
        triggerEditTodoModal={ this._triggerEditTodoModal }
      />
    ));
  }

  _renderAddTodoTop() {
    return (
      <AddTodoBlock
        addToTop
        editMode
      />
    );
  }

  _triggerRenderAddTodoTop = () => {
    this.setState({ showAddTodoTop: true });
  }

  render() {
    const {
      showAddTodoTop,
      todos
    } = this.state;

    return (
      <div style={ style.container }>
        <button
          onClick={ this._triggerRenderAddTodoTop }
          style={ style.addButton }
        >
          Add Todo
        </button>
        { showAddTodoTop ? this._renderAddTodoTop() : null }
        { this._renderTodos() }
        <AddTodoBlock />
        <TodoModal />
      </div>
    );
  }
}

const style = {
  container: {
    width: '80%',
    maxWidth: '800px',
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
    dispatchDeleteTodo: deleteTodo,
    dispatchFetchTodoList: fetchTodoList,
    dispatchSetModal: setModal,
  }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoListContainer);
