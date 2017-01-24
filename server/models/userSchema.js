var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	user_id: String,
	name: String,
	email: String,
	picture: String,
	role: String,
	status: String,
	jobs : [{
		job_id: String,
		title: String
	}],
	requests : [{
		request_id: String,
		title: String
	}],
	created_at: { type : Date, default: Date.now }
});

var User = mongoose.model('User', userSchema);

module.exports = User;