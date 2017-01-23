var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	name: String,
	email: String,
	role: String,
	SSO_id: String,
	rating : {
		telephone: Number
	},
	status: String,
	created_at: { type : Date, default: Date.now }
});

var User = mongoose.model('User', userSchema);

module.exports = User;