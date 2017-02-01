var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var ratingSchema = new Schema({
	user_id: String,
	vendor_rating_avg: Number,
	vendor_rating: [{
		rating: Number,
		category: String,
		reviewer: String,
		reviewer_img: String,
		review: String
	}],
	provider_rating_avg: Number,
	provider_rating: [{
		rating: Number,
		category: String,
		reviewer: String,
		reviewer_img: String,
		review: String
	}]
});

var rating = mongoose.model('rating', ratingSchema);

module.exports = rating;