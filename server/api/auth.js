const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../../config/keys');
const User = require('./users/user.model');

const newToken = (user) =>
	jwt.sign({ id: user.id }, config.jwt, { expiresIn: config.jwtExp });

const verifyToken = (token) =>
	new Promise((resolve, reject) => {
		jwt.verify(token, config.jwt, (err, payload) => {
			if (err) return reject(err);
			resolve(payload);
		});
	});

const login = async (req, res) => {
	let request = req.body;
	const { email, password } = request;
	console.log('req.body::', req.body);
	if (!email || !password) {
		console.log('what happened');

		return res.status(400).send({ msg: 'Email and password required' });
	}
	try {
		const user = await User.findOne({ email: email });

		if (!user) {
			return res.status(404).send({ msg: 'Please register' });
		}
		const match = await bcrypt.compare(password, user.password);
		if (!match) {
			return res
				.status(401)
				.send({ message: 'Invalid email and password combination' });
		}
		const token = await newToken(user);
		return res.status(201).send({ token });
	} catch (error) {
		return res.status(500).end();
	}
};
exports.login = login;

const register = async (req, res) => {
	const { email, password, name } = req.body;
	if (!email || !password) {
		return res.status(400).send({ message: 'Email and password required' });
	}
	try {
		const user = await User.findOne({ email: email }).select('email').exec();
		console.log('user::', user);

		if (user) {
			return res.status(400).send({ message: 'You have an account already' });
		}

		const hash = await bcrypt.hash(password, 10);

		const newUser = {
			name,
			email,
			password: hash,
		};
		const createUserResponse = await User.create(newUser);
		const freshToken = newToken(createUserResponse);
		return res.status(200).send({ token: freshToken });
	} catch (error) {
		console.log(error);

		return res.status(500).send({ message: 'what went wrong' });
	}
};
exports.register = register;

const protectedRoute = async (req, res, next) => {
	const bearer = req.headers.authorization;
	if (!bearer || !bearer.startsWith('Bearer ')) {
		return res.status(401).end();
	}
	const token = bearer.split('Bearer ')[1].trim();
	if (!token) {
		return res.status(401).end();
	}
	let payload;
	try {
		payload = await verifyToken(token);
	} catch (error) {
		return res.status(401).end();
	}
	const user = await User.findById(payload.id)
		.select('-password')
		.lean()
		.exec();
	if (!user) {
		return res.status(401).end();
	}
	req.user = user;
	return next();
};
exports.protectedRoute = protectedRoute;
