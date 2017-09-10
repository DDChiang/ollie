export const SET_TODO_DATA = 'SET_TODO_DATA';

export const setTodoData = (todo) => {
  return {
    type: SET_TODO_DATA,
    todo,
  };
};
