var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var requestSchema = new Schema({
	job_id: String,
	job_owner_id: String,
	title: String,
	bid: Number,
	status: String,
	stage: Number,
	rating: Number,
	provider_id: String,
	provider_date: Date,
	provider_time: String,
	provider_name: String,
	provider_profile: String,
	provider_rating: String,
	provider_status: String,
	comments: [{
		time_stamp: { type : Date, default: Date.now },
		from: String,
		comment: String
	}],
	active: Boolean,
	completed_date: Date,
	archived: Boolean,
	notify_comment: String,
	provider_images: [{
		image_path: String
	}],
	created_at: { type : Date, default: Date.now }
});

var request = mongoose.model('request', requestSchema);

module.exports = request;