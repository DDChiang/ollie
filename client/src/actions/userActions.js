export const FETCH_USER = 'FETCH_USER';
export const REQUEST_USER = 'REQUEST_USER';
export const RECEIVE_USER = 'RECEIVE_USER';

export const requestUser = (userId) => {
  return {
    type: REQUEST_USER,
    userId,
  };
};

export const receiveUser = (user) => {
  return {
    type: RECEIVE_USER,
    user,
  };
};

export const fetchUser = (userInfo) => {
  return dispatch => {
    dispatch(requestUser());

    const data = {
      body: JSON.stringify(userInfo),
    };

    return fetch('/api/user', data)
      .then(
        response => response.json(),
        error => console.log('An error occured', error)
      )
      .then((response) => {
        console.log(response);
        dispatch(receiveUser(response))
      }
    )
  }
};
