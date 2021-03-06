const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors')
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const surveyRouter = require('./routes/survey')
const profileRouter = require('./routes/profile')
const receiptRouter = require('./routes/receipt')
const ingredientRouter = require('./routes/ingredient')
const categoriesRouter = require('./routes/categories')
const fileRouter = require('./routes/file')

const verifyToken = require("./middleware/auth");
const logError = require("./middleware/logError");



const corsOptions = {
  origin: 'http://localhost:8081',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
require("dotenv").config();
require("./config/database/index").connect();
const app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(verifyToken)
app.use(logError)


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/survey', surveyRouter);
app.use('/profile', profileRouter);
app.use('/receipt', receiptRouter);
app.use('/ingredient', ingredientRouter);
app.use('/categories', categoriesRouter);
app.use('/file', fileRouter);

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
});

module.exports = app;
