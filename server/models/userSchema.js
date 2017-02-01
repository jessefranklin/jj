var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var userSchema = new Schema({
	user_id: String,
	name: String,
	email: String,
	picture: String,
	title: String,
	location: String,
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
	skills : [{
		category: String,
		total: Number
	}],
	rating_id: String,
	ratings : {
		vendor_rating: Number,
		vendor_rating_count: Number,
		provider_rating: Number,
		provider_rating_count: Number
	},
	s_customer_token: String,
	archive_id: String,
	preferences: {
		jobs: Boolean,
		requests: Boolean,
		profile: Boolean
	},
	accounting_id: String,
	accounting : {
		balance: Number,
		total_earned: Number,
		total_paid: Number
	},
	created_at: { type : Date, default: Date.now }
});

var User = mongoose.model('User', userSchema);

module.exports = User;