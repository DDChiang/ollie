import uuidv4 from 'uuid';
import _ from 'lodash';

import {
  ADD_TODO,
  EDIT_TODO,
  DELETE_TODO,
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

    case DELETE_TODO:
      // TODO: BE
      // static
      return state.filter((item, i) => {
        return item.id !== action.id;
      });

    case EDIT_TODO:
      return state;

    case FETCH_TODO_LIST:
      return action.todoList;

    default:
      return state;
  }
};
