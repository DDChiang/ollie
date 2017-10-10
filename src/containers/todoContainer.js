import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  deleteTodo,
  fetchTodoList,
} from '../actions/todoActions';
import {
  setModal,
} from '../actions/modalActions';
import TodoModal from './TodoModal';
import TodoItem from '../components/TodoItem';

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
        <button onClick={ this.triggerAddTodoModal }>Button</button>
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
