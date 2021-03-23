const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested, Content-Type, Accept, Authorization'
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json();
  }
  next();
});

app.use('/auth', require('./routes/auth.routes'));
app.use('/project', require('./routes/project.routes'));
app.use('/users', require('./routes/user.routes'));
app.use('/product-backlog-item', require('./routes/productBacklogItem.routes'));
app.use('/sprint', require('./routes/sprint.routes'));
app.use('/user-story', require('./routes/userStory.routes'));
app.use(
  '/sprint-retrospective',
  require('./routes/sprintRetrospective.routes')
);
app.use('/task', require('./routes/task.routes'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});

module.exports = app;
