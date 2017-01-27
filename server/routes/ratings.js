var RatingModel = require('../models/ratingSchema');

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
			if(err) res.send(err);
			res.json(rating);
        });
    });

};