var UserModel = require('../models/userSchema');

module.exports = function (app) {
	// Get all jobs
	app.get('/api/user', function (req, res) {
        UserModel.find(function(err, users) {
			if(err) res.send(err);
			res.json(users);
        });
    });

	// Create job
    app.post('/api/user', function(req, res){
		UserModel.create(req.body, function (err, users){
			if (err) res.send(err);
			console.log(users);
			res.json(users);
		});
    });

    // Get job by id
    app.get('/api/user/:id', function (req, res) {
        UserModel.find({_id:req.params.id},function(err, users) {
			if(err) res.send(err);
			res.json(users);
        });
    });

    // Edit job
    app.put('/api/user/:id', function (req, res) {
		var query = {_id:req.params.id},
		update = {
			"$set": req.body
		},
		options = { "multi": true };
        UserModel.update(query, update, options, function(err, users) {
			if(err) res.send(err);
			console.log(req.body);
			res.json(users);
        });
    });

};