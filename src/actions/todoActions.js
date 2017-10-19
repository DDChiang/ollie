import testData from '../../data/testData';

export const ADD_TODO = 'ADD_TODO';
export const SAVE_TODO = 'SAVE_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const FETCH_TODO_LIST = 'FETCH_TODO_LIST';
export const MOVE_TODO = 'MOVE_TODO';

export const fetchTodoList = (personId) => {
  // TODO: get todoList for correct person
  const todoList = testData;

  return {
    type: FETCH_TODO_LIST,
    todoList,
  }
}

export const addTodo = (todoVal) => {
  return {
    type: ADD_TODO,
    todoVal,
  }
}

export const deleteTodo = (id) => {
  return {
    type: DELETE_TODO,
    id,
  }
}

export const moveTodo = (currIndex, newIndex) => {
  return {
    type: MOVE_TODO,
    currIndex,
    newIndex,
  }
}

export const saveTodo = ({ id, value }) => {
  return {
    type: SAVE_TODO,
    id,
    value,
  }
}
