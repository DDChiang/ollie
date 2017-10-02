import uuidv4 from 'uuid';

import {
  ADD_TODO,
  FETCH_TODO_LIST,
} from '../actions/todoActions';

export const todoInitialState = [];

export default (state = todoInitialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      // TODO: BE
      // static
      const newTodo = {
        id: uuidv4(),
        value: action.todoVal,
      };

      return state.concat([newTodo]);

    case FETCH_TODO_LIST:
      return action.todoList;

    default:
      return state;
  }
};
