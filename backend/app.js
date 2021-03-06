var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var documentsRouter = require('./routes/documents');
var loginRouter = require('./routes/login');
const mysql = require('mysql2');
const cors = require('cors');

var app = express();

//Connect to mySQL(phpMyAdmin)
app.locals.con = mysql.createConnection({
    host: "localhost",
    port: "8889",
    user: "usernote",
    password: "usernote",
    database: "usernote"
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/documents', documentsRouter);
app.use('/login', loginRouter);

module.exports = app;
