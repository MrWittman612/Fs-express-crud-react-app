var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserModelSchema = new Schema({
	name: String,
	age: Date,
	password: String,
});
// Compile model from schema
var UserModel = mongoose.model('UserModel', UserModelSchema);
