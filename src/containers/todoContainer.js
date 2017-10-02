import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  fetchTodoList,
} from '../actions/todoActions';
import {
  setModal,
} from '../actions/modalActions';
import TodoModal from './TodoModal';
import TodoItem from '../components/TodoItem';

export class TodoContainer extends Component {
  componentWillMount() {
    const { dispatchFetchTodoList } = this.props;

    dispatchFetchTodoList();
  }

  triggerAddTodoModal = () => {
    const { dispatchSetModal } = this.props;

    dispatchSetModal('addTodo');
  };

  render() {
    const { todos } = this.props;

    console.log(todos);

    return (
      <div>
        <button onClick={ this.triggerAddTodoModal }>Button</button>
        <ul>
          {
            todos.map((todo) => {
              return <TodoItem { ...todo } />
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
    dispatchFetchTodoList: fetchTodoList,
    dispatchSetModal: setModal,
  }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoContainer);
