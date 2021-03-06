const mongoose = require('mongoose');
const db = require('../../config/keys').mongoURI;

function connectMongoDB() {
	mongoose
		.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
		.then(() => console.log('mongoDB connected'))
		.catch((error) => console.log(error));
}

module.exports = connectMongoDB;
