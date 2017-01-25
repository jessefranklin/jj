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

    // Get user by owner
    app.get('/api/user/:id', function (req, res) {
        UserModel.find({'user_id':req.params.id},function(err, users) {
			if(err) res.send(err);
			res.json(users);
        });
    });

    // Edit job
    app.put('/api/user/:id', function (req, res) {
		var query = {'user_id':req.params.id},
		update = {
			"$set": req.body
		},
		options = { "multi": true };
        UserModel.update(query, update, options, function(err, users) {
			if(err) res.send(err);
			res.json(users);
        });
    });

    // Remove job from user array
    app.put('/api/removefromuser/:id', function (req, res) {
		var query = {'user_id':req.params.id},
		update = {
			"$pull": { 'jobs': { 'job_id':req.body.job_id }}
		},
		options = { "multi": true };
        UserModel.update(query, update, options, function(err, users) {
			if(err) res.send(err);
			res.json(users);
        });
    });

    // Add job or apply to user array
    app.put('/api/addtouser/:id/:type', function (req, res) {
		var key = req.params.type, push = {};
		push[key] = req.body;
		var query = {'user_id':req.params.id},
		update = {
			"$push":push
		},
		options = { "multi": true };
        UserModel.update(query, update, options, function(err, users) {
			if(err) res.send(err);
			res.json(users);
        });
    });

};