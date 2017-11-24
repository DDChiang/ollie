import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import AddListBlock from '../components/AddListBlock';
import ListBlock from '../components/ListBlock';
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

  _renderLists() {
    const { todolists } = this.props;

    return todolists.map((list) => {
      const { id } = list;

      return (
        <ListBlock
          key={ `${id}-list` }
          data={ list }
        />
      );
    });
  }

  _renderAddListBlock() {
    return <AddListBlock />;
  }

  render() {
    const { match } = this.props;

    return (
      <div>
        <h1>List of TodoList's</h1>
        <div style={ style.collection }>
          { this._renderLists() }
          { this._renderAddListBlock() }
        </div>
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

const style = {
  collection: {
    border: '1px solid yellow',
    padding: '12px',
    display: 'flex',
  },
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoListsContainer);
