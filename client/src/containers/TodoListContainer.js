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
  }

  componentWillMount() {
    this.props.dispatchFetchTodoList();
  }

  componentWillReceiveProps(nextProps) {
    if (_.isEqual(nextProps.todos, this.props.todos)) {
      this.setState({
        todos: nextProps.todos,
      });
    }

    this.setState({
      showAddTodoTop: false,
    });
  }

  _triggerRenderAddTodoTop = () => {
    this.setState({
      showAddTodoTop: true,
    });
  }

  _renderAddTodoTop() {
    const { showAddTodoTop } = this.state;

    if (showAddTodoTop) {
      return (
        <AddTodoBlock
          addToTop
          editMode
        />
      );
    }
  }

  _renderAddTodoBottom() {
    const { showAddTodoTop } = this.state;

    if (!showAddTodoTop) return <AddTodoBlock />
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
      <div style={ style.container }>
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
    dispatchFetchTodoList: fetchTodoList,
  }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoListContainer);
