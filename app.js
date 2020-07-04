var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const connectMongoDB = require('./server/utils/connectMongoDB');

var usersRouter = require('./server/api/users/users');
// var indexRouter = require('./server/api/routes/index');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
connectMongoDB();
// app.use('/', indexRouter);

app.use('/users', usersRouter);

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

module.exports = app;
