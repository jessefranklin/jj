var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var userSchema = new Schema({
	user_id: String,
	name: String,
	email: String,
	picture: String,
	description: String,
	role: String,
	status: String,
	jobs : [{
		job_id: String,
		title: String,
		category: String,
		status: String
	}],
	requests : [{
		request_id: String,
		job_id: String,
		title: String,
		status: String
	}],
	rating_id: String,
	rating_avg: Number,
	s_customer_token: String,
	archive_id: String,
	balance: Number,
	accounting_id: String,
	created_at: { type : Date, default: Date.now }
});

var User = mongoose.model('User', userSchema);

module.exports = User;