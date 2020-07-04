var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserModelSchema = new Schema({
	name: String,
	email: String,
	password: String,
});
// Compile model from schema
module.exports = UserModel = mongoose.model('UserModel', UserModelSchema);
