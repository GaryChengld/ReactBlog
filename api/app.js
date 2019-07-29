/* eslint no-unused-vars: "off" */

require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const db = require('./db/db');
const graphqlHandler = require('./graphql/graphqlHandler');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  console.log(err);
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  if (err.name === 'UnauthorizedError') {
    res.status(401)
      .json({ message: `${err.name}: ${err.message}` });
  } else {
    res.status(err.status || 500).json(err);
  }
});

db.connect();
graphqlHandler.start(app);

module.exports = app;
