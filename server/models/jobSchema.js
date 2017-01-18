var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var jobSchema = new Schema({
	title: String,
	service_name: String,
	service_description: String,
	service_category: String,
	owner: String,
	status: String,
	request: {
		active: Boolean,
		state: String,
		date_required: Date,
		date_fulfillment_by: Date,
	},
	location: {
		address: String,
		lat: Number,
		long: Number,
		intersection: String
	},
	cost: {
		arrange: String,
		fee: Number,
		amount: Number,
		total_amount: Number
	},
	hours: {
		exact_hours: Number,
		min_hours: Number,
		max_hours: Number
	},
	images: [{
		image_name: String,
		image_path: String
	}],
	applicants: [{
		status: String,
		id: Number
	}],
	created_at: Date
});

jobSchema.pre('save', function(next) {
  var currentDate = new Date();
  this.updated_at = currentDate;
  if (!this.created_at) this.created_at = currentDate;
  next();
});

var Jobs = mongoose.model('Jobs', jobSchema);

module.exports = Jobs;