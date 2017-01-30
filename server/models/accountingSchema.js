var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var accountingSchema = new Schema({
	user_id: String,
	balance: Number,
	total_earnings: Number,
	owed: [{
		processed: { type : Date, default: Date.now },
		job_id: Number,
		job_title: String,
		request_id: String,
		amount: Number,
		status: String
	}],
	earned: [{
		processed: { type : Date, default: Date.now },
		job_id: Number,
		job_title: String,
		request_id: String,
		amount: Number,
		status: String
	}]
});

var accounting = mongoose.model('accounting', accountingSchema);

module.exports = accounting;