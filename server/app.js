var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var connectdb = require('./config/db')
var authRoute = require('./routes/authRoutes')
var hearingAidsRoute = require('./routes/hearingaids.route')
var appointmentsRoute = require('./routes/appointments.route')
var imageUploadRoute = require('./routes/imgupload.route')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

connectdb();

const corsOptions = {
  origin: true,
  credentials: true,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use((req, res, next) => {
  // Helps Google auth popup/iframe postMessage flows in development.
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
  res.setHeader('Cross-Origin-Embedder-Policy', 'unsafe-none');
  next();
});
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Serve react app static files
app.use(express.static(path.join(__dirname, '../client/dist')));

app.use('/api/auth', authRoute);
app.use('/api/hearingaids', hearingAidsRoute);
app.use('/api/appointments', appointmentsRoute);
app.use('/api/imgupload', imageUploadRoute);
app.use('/', indexRouter);
app.use('/users', usersRouter);

// Fallback to serve index.html for client-side routing (must be after API routes)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
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
