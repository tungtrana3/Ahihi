var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressSession = require('express-session');
var bodyParser = require('body-parser');
var passport = require('passport');
var cors = require('cors')
var mongoose = require('mongoose')
var multer = require('multer')
var upload = multer({ dest: 'public/img' })
var flash = require('connect-flash');
var fs = require('fs');
var formData = require('express-form-data');

var routeServer = require('./routes/routeServer');
var usersRouter = require('./routes/users');
var routesApi = require('./routes/routes')

var app = express();
// use public 
app.use('/css', express.static('public/css'));
app.use('/js', express.static('public/js'));
app.use('/img', express.static('public/img'));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSession({
  isLogin: false,
  resave: false,
  saveUninitialized: true,
  secret: 'keyboard cat',
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(cookieParser('secret'));
app.use(expressSession({ cookie: { maxAge: 60000 } }));
app.use('/', routeServer);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
