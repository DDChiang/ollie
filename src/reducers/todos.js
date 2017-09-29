import {
  ADD_TODO,
  FETCH_TODO_LIST,
} from '../actions/todoActions';

export const todoInitialState = [];

export default (state = todoInitialState, action) => {
  switch (action.type) {
    // case SET_TODO_DATA:
    //   return action.todo;

    case FETCH_TODO_LIST:
      return action.todoList;

    default:
      return state;
  }
};
