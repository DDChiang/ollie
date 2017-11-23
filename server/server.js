import {
  testData,
  testTodoLists,
} from './data/testData';
import testUser from './data/testUser';
import cors from 'cors';

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'production';

app.use('*', cors({
  credentials: true,
  origin: true,
}));

app.get('/', (req, res) => {
  res.send({
    word: 'hello',
    bee: 'efefe',
  });
});

app.get('/api/user', (req, res) => {
  // send as json for now pulling test data
  res.json(testUser);
});

app.get('/api/todos', (req, res) => {
  res.json(testData);
});

app.get('/api/todolists', (req, res) => {
  res.json(testTodoLists);
});

app.listen(port, () => {
  console.log(`App is listening at port ${port} [${env}]`);
});
