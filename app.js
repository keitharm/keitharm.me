const express      = require('express');
const path         = require('path');
const favicon      = require('serve-favicon');
const logger       = require('morgan');
const cookieParser = require('cookie-parser');
const compress     = require('compression');
const bodyParser   = require('body-parser');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, '.viewsMin'));
app.set('view engine', 'ejs');

app.use(compress());
app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('*', (req, res, next) => {
  // Default vars to send into views
  app.set('defaultVars', {
    title: null,
    originalUrl: req.originalUrl
  });
  next();
});

app.use('/', require('./routes/index'));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.send(err.status || 500);
    // res.render('pages/error', {
    //   message: err.message,
    //   error: err
    // });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.send(err.status || 500);
  // res.render('pages/error', {
  //   message: err.message,
  //   error: {}
  // });
});

module.exports = app;
