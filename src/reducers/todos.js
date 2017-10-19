import uuidv4 from 'uuid';
import _ from 'lodash';

import {
  ADD_TODO,
  DELETE_TODO,
  MOVE_TODO,
  SAVE_TODO,
  FETCH_TODO_LIST,
} from '../actions/todoActions';

export const todoInitialState = [];

export default (state = todoInitialState, action) => {
  let todosClone;

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

    case MOVE_TODO:
      // TODO: BE
      // static
      const currIndex = action.currIndex;
      const newIndex = action.newIndex;
      const todoToMove = _.clone(state[currIndex]);
      todosClone = _.cloneDeep(state);
      todosClone.splice(currIndex, 1);
      todosClone.splice(newIndex, 0, todoToMove);

      return todosClone;

    case SAVE_TODO:
      const todoId = action.id;
      const todoNewValue = action.value;
      todosClone = _.cloneDeep(state);

      const editIndex = _.findIndex(todosClone, (todo) => {
        return todo.id === todoId;
      });
      const editTodo = _.assign({}, todosClone[editIndex], {
        value: todoNewValue,
      });

      todosClone.splice(editIndex, 1, editTodo);

      return todosClone;

    case FETCH_TODO_LIST:
      return action.todoList;

    default:
      return state;
  }
};
