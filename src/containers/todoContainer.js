import React, { Component } from 'react';
import Radium from 'radium';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import {
  deleteTodo,
  fetchTodoList,
} from '../actions/todoActions';
import {
  setModal,
} from '../actions/modalActions';
import TodoModal from './TodoModal';
import TodoItem from '../components/TodoItem';

@DragDropContext(HTML5Backend)
@Radium
export class TodoContainer extends Component {
  componentWillMount() {
    this.props.dispatchFetchTodoList();
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
    const { todos } = this.props;

    return (
      <div>
        <button
          onClick={ this.triggerAddTodoModal }
          style={ style.addButton }
        >
          Add Todo
        </button>
        <ul>
          {
            todos.map((todo, ind) => {
              return (
                <TodoItem
                  dataIndex={ ind }
                  key={ `todo-${ind}` }
                  { ...todo }
                  deleteTodo={ this.deleteTodo }
                  triggerEditTodoModal={ this._triggerEditTodoModal }
                />
              );
            })
          }
        </ul>
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
