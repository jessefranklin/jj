var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var jobSchema = new Schema({
	title: String,
	service_name: String,
	service_description: String,
	service_category: String,
	owner: String,
	address: String,
	status: String,
	request_id: String,
	owner_meta : {
		name: String,
		picture: String,
		rating: String,
		telephone: Number
	},
	request: {
		active: Boolean,
		state: String,
		date_required: Date,
		time_range: String,
		time_required: Date,
		expire_post: Boolean,
		date_fulfillment_by: Date,
	},
	location: {
        type: { type: String },
        coordinates: [Number]
    },
	cost: {
		arrange: String,
		hours: Number,
		rate: Number,
		total_amount: Number
	},
	hours: {
		exact_hours: Number,
		min_hours: Number,
		max_hours: Number
	},
	image: [{
		image_name: String,
		image_path: String
	}],
	applicants: [{
		applicant_id: String,
		request_id: String,
		status: String
	}],
	provider: {
		user_id: String,
		request_id: String
	},
	created_at: { type : Date, default: Date.now }
});

jobSchema.pre('save', function(next) {
  var currentDate = new Date();
  this.updated_at = currentDate;
  if (!this.created_at) this.created_at = currentDate;
  next();
});

jobSchema.index({ "location": "2dsphere" });

var Jobs = mongoose.model('Jobs', jobSchema);

module.exports = Jobs;