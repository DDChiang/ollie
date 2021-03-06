export const CREATE_TODO = 'CREATE_TODO';
export const SAVE_TODO = 'SAVE_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const FETCH_TODO_LIST = 'FETCH_TODO_LIST';
export const MOVE_TODO = 'MOVE_TODO';

export const REQUEST_TODOS = 'REQUEST_TODOS';
export const RECEIVE_TODOS = 'RECEIVE_TODOS';

export const requestTodoList = () => {
  return {
    type: REQUEST_TODOS,
  }
}

export const receiveTodoList = (personId, json) => {
  return {
    type: RECEIVE_TODOS,
    personId,
    todoList: json,
    receivedAt: Date.now(),
  }
}

export const createTodo = ({ todoVal, addToTop }) => {
  return {
    type: CREATE_TODO,
    todoVal,
    addToTop,
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

// Thunk action creators!
export const fetchTodoList = (personId) => {
  return (dispatch) => {
    dispatch(requestTodoList());

    return fetch('/api/todos')
      .then(
        response => response.json(),
        error => console.log('An error occured', error)
      )
      .then(response =>
        dispatch(receiveTodoList(personId, response))
      )
  }
}
