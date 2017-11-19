import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

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
    return (
      <div>
        List of TodoList's
      </div>
    );
  }
}

TodoListsContainer.defaultProps = {

};

TodoListsContainer.propTypes = {
  userId: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  return {
    userId: state.user.id,
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
