var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var requestSchema = new Schema({
	job_id: String,
	job_owner_id: String,
	provider_id: String,
	provider_date: Date,
	provider_time: String,
	provider_name: String,
	rating: String,
	bid: Number,
	status: String,
	stage: Number,
	comments: [{
		comment: String
	}],
	title: String,
	completed: Boolean,
	archived: Boolean,
	active: Boolean,
	created_at: { type : Date, default: Date.now }
});

var request = mongoose.model('request', requestSchema);

module.exports = request;