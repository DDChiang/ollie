import testData from './data/testData';
import testUser from './data/testUser';

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'production';

app.get('/', (req, res) => {
  res.send({
    word: 'hello',
    bee: 'efefe',
  });
});

app.get('/api/user', (req, res) => {
  res.json(testUser);
});

app.get('/api/todos', (req, res) => {
  res.json(testData);
});

app.listen(port, () => {
  console.log(`App is listening at port ${port} [${env}]`);
});
