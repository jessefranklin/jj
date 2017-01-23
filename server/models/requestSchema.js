var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var requestSchema = new Schema({
	title: String,
	service_name: String,
	service_description: String,
	service_category: String,
	owner: String,
	owner_meta : {
		telephone: Number
	},
	created_at: { type : Date, default: Date.now }
});

var request = mongoose.model('request', requestSchema);

module.exports = request;