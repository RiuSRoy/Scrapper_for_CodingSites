var express = require('express');
var path = require('path');
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

/*Example 1
var url = "http://www.spoj.com/users/subodra_9/";
var destination = fs.createWriteStream('./downloads/subodra_9.html');
request(url , (err,res,body) => {
  if(err) {
    console.log(err);
  }
  else {
    console.log(body);
  }
});*/
/*Example 2
var url = "http://www.spoj.com/users/riu_20/";
var destination = fs.createWriteStream('./downloads/riu_20.html');
request(url)
.pipe(destination)
.on('finish' , () => {
  console.log('done');
})
.on('error',(err) => {
  console.log(err);
});*/



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
