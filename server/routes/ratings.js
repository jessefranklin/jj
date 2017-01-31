var RatingModel = require('../models/ratingSchema');
var UserModel = require('../models/userSchema');

module.exports = function (app) {

	// Create rating
    app.post('/api/rating', function(req, res){
		RatingModel.create(req.body, function (err, rating){
			if (err) res.send(err);
			console.log(rating);
			res.json(rating);
		});
    });

    // Get ratings and reviews for user
    app.get('/api/rating/:id', function (req, res) {
        RatingModel.find({'user_id':req.params.id},function(err, rating) {
			if(err) res.send(err);
			res.json(rating);
        });
    });

    // Add rating to array
    app.put('/api/addtorating/:id/:type', function (req, res) {
		var key = req.params.type, push = {};
		push[key] = req.body;
		var query = {'user_id':req.params.id},
		update = {
			$push : push
		},
		options = { "multi": true };
        RatingModel.update(query, update, options, function(err, rating) {
			pushAverage(req.params.id,req.params.type);
        });
    });

    // Push average rating to user obj
	var pushAverage = function(id,type) {
		RatingModel.aggregate([
			{ $unwind:'$'+type},
			{ $group: {
					"_id": {
						"_id": "$_id",
						"user_id": id
					},
					"vendor_rating":{
						"$push": '$'+type
					},
					"ratings_average": {
						"$avg": '$'+type+'.rating'
					}
				}
			},
			{ "$project": {
				"_id": 0,
				"user_id": "$_id.user_id",
				"ratings_average": 1,
				"vendor_rating": 1
			}}], function (err, result) {
				if (err) {
					console.log(err);
					return;
				}
			var key = type, push = {};
			push[key] =  result[0].ratings_average;
			var query = {'user_id':result[0].user_id},
			update = {
				"$set": { "ratings": push }
			},
			options = { "multi": true };
			UserModel.update(query, update, options, function(err, user) {
				console.log(user);
			});
		});
	};



};