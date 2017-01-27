var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var requestSchema = new Schema({
	job_id: String,
	job_owner_id: String,
	provider_id: String,
	provider_date: Date,
	provider_time: String,
	provider_name: String,
	title: String,
	bid: Number,
	status: String,
	provider_status: String,
	stage: Number,
	rating: Number,
	comments: [{
		comment: String
	}],
	completed_date: Date,
	archived: Boolean,
	active: Boolean,
	created_at: { type : Date, default: Date.now }
});

var request = mongoose.model('request', requestSchema);

module.exports = request;