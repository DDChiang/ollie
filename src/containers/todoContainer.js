import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchTodoList } from '../actions/todoActions';
import TodoItem from '../components/todoItem';

export class TodoContainer extends Component {
  componentWillMount() {
    const {
      dispatchFetchTodoList,
    } = this.props;

    dispatchFetchTodoList();
  }

  render() {
    const { todos } = this.props;

    return (
      <div>
        <ul>
          {
            todos.map((todo) => {
              return <TodoItem { ...todo } />
            })
          }
        </ul>
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
  }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoContainer);
