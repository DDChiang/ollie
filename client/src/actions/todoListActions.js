export const ADD_TODO_LIST = 'ADD_TODO_LIST';
export const DELETE_TODO_LIST = 'DELETE_TODO_LIST';
export const FETCH_TODO_LISTS = 'FETCH_TODO_LISTS';

export const REQUEST_TODO_LISTS = 'REQUEST_TODO_LISTS';
export const RECEIVE_TODO_LISTS = 'RECEIVE_TODO_LISTS';

export const requestTodoLists = () => ({
  type: REQUEST_TODO_LISTS,
})

export const receiveTodoLists = (todoLists) => ({
  type: RECEIVE_TODO_LISTS,
  todoLists,
});

export const fetchTodoLists = (personId) => {
  return (dispatch) => {
    dispatch(requestTodoLists());

    return fetch('/api/todoLists')
      .then(
        response => response.json(),
        err => console.log('An error occured', error)
      )
      .then(res => {
        dispatch(receiveTodoLists(res));
      })
  }
}
