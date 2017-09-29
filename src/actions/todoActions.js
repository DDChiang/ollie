import testData from '../../data/testData';

export const ADD_TODO = 'ADD_TODO';
export const FETCH_TODO_LIST = 'FETCH_TODO_LIST';

export const fetchTodoList = (personId) => {
  // TODO: get todoList for correct person
  const todoList = testData;

  return {
    type: FETCH_TODO_LIST,
    todoList,
  }
};


export const addTodo = (todo) => {
  return {
    type: ADD_TODO,
    todo,
  };
};
