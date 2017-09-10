import {
  SET_TODO_DATA,
} from '../actions/todoActions';

export const todoInitialState = {
  todos: []
};

export default (state = todoInitialState, action) => {
  switch (action.type) {
    case SET_TODO_DATA:
      return action.todo;

    default:
      return state;
  }
};
