var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var accountingSchema = new Schema({
	user_id: String,
	balance: Number,
	total_earnings: Number,
	paid: [{
		processed: { type : Date, default: Date.now },
		job_id: String,
		job_title: String,
		request_id: String,
		amount: Number,
		status: String
	}],
	earned: [{
		processed: { type : Date, default: Date.now },
		job_id: String,
		job_title: String,
		request_id: String,
		amount: Number,
		status: String,
		received: Boolean
	}]
});

var accounting = mongoose.model('accounting', accountingSchema);

module.exports = accounting;