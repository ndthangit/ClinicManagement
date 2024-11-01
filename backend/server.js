require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var doctorRouter = require('./routes/doctor');
var appointmentRouter = require('./routes/appointment');


var server = express();
var cors = require('cors')

// view engine setup
server.set('views', path.join(__dirname, 'views'));
server.set('view engine', 'ejs');
server.use(cors())
server.use(logger('dev'));
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cookieParser());
server.use(express.static(path.join(__dirname, 'public')));

server.use('/', indexRouter)
server.use('/users', usersRouter)
server.use('/doctor',doctorRouter)
server.use('/appointment', appointmentRouter)


// catch 404 and forward to error handler
server.use(function(req, res, next) {
  next(createError(404));
});

server.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = server;
