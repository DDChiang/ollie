import _ from 'lodash';

// simple list (task)
export const testData = _.times(4, (num) => {
  return {
    id: `${num}`,
    value: `Do Something ${num}`,
  }
});

// simple list of lists
export const testTodoLists = _.times(4, (num) => {
  return {
    id: `${num}-todoList`,
    name: `Todo List ${num}`,
  }
});
