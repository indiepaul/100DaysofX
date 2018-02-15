var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var index = require('./routes/index');
var app = express();

var mongoose = require('mongoose');
var config = require('./config/config');
mongoose.connect(config.db_dev, {
  useMongoClient: true,
});
mongoose.Promise = global.Promise;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/goals', index);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send(err);
});
module.exports = app;