import testData from '../../data/testData';

export const ADD_TODO = 'ADD_TODO';
export const EDIT_TODO = 'EDIT_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const FETCH_TODO_LIST = 'FETCH_TODO_LIST';

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

export const editTodo = (id, value) => {
  return {
    type: DELETE_TODO,
    id,
    value,
  }
}
