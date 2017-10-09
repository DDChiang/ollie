import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  deleteTodo,
  editTodo,
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

  deleteTodo = (id) => {
    this.props.dispatchDeleteTodo(id);
  }

  editTodo = (id, val) => {
    this.props.dispatchEditTodo(id, val);
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
    dispatchEditTodo: editTodo,
    dispatchFetchTodoList: fetchTodoList,
    dispatchSetModal: setModal,
  }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoContainer);
