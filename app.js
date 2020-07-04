var express = require('express');
var path = require('path');
var logger = require('morgan');

const connectMongoDB = require('./server/utils/connectMongoDB');

var userRouter = require('./server/api/users/user.router');
const { register, login, protectedRoute } = require('./server/api/auth');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectMongoDB();

app.post('/api/login', login);
app.post('/api/register', register);

app.use('/api/user', protectedRoute, userRouter);

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

module.exports = app;
