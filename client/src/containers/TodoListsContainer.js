import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Link,
} from 'react-router-dom';

import { fetchTodoLists } from '../actions/todoListActions';

@Radium
export class TodoListsContainer extends Component {
  componentWillMount() {
    const {
      dispatchFetchTodoLists,
      userId,
    } = this.props;
    dispatchFetchTodoLists(userId);
  }

  render() {
    const { match } = this.props;

    return (
      <div>
        List of TodoList's
        {
          this.props.todolists.map((todoList) => {
            const { id, name } = todoList;

            return (
              <div key={ id }>
                <Link to={ `todolist/${id}` }>{ name }</Link>
              </div>
            );
          })
        }
      </div>
    );
  }
}

TodoListsContainer.defaultProps = {
  todolists: [],
};

TodoListsContainer.propTypes = {
  userId: PropTypes.string.isRequired,
  todolists: PropTypes.arrayOf(
    PropTypes.shape({})
  ),
};

const mapStateToProps = ({ user, todoLists }) => {
  return {
    userId: user.id,
    todolists: todoLists.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    dispatchFetchTodoLists: fetchTodoLists,
  }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoListsContainer);
