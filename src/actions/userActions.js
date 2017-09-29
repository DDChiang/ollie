export const FETCH_USER = 'FETCH_USER';

import testUser from '../../data/testUser';

export const fetchUser = (user) => {
  return {
    type: FETCH_USER,
    user: testUser,
  };
};
