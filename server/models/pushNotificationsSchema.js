var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var pushNotificationsSchema = new Schema({
	notifications: [{
		time_stamp: { type : Date, default: Date.now },
		activity: String,
		title: String,
		response: String,
		viewed: Boolean
	}]
});

var pushNotifications = mongoose.model('pushNotifications', pushNotificationsSchema);

module.exports = pushNotifications;