var requestModel = require('../models/requestSchema');

module.exports = function (app) {
	// Get all jobs
	app.get('/api/request', function (req, res) {
        requestModel.find(function(err, request) {
			if(err) res.send(err);
			res.json(request);
        });
    });

	// Create job
    app.post('/api/request', function(req, res){
		requestModel.create(req.body, function (err, request){
			if (err) res.send(err);
			console.log(request);
			res.json(request);
		});
    });

    // Get job by id
    app.get('/api/request/:id', function (req, res) {
        requestModel.find({_id:req.params.id},function(err, request) {
			if(err) res.send(err);
			res.json(request);
        });
    });

    // Edit job
    app.put('/api/request/:id', function (req, res) {
		var query = {_id:req.params.id},
		update = {
			"$set": req.body
		},
		options = { "multi": true };
        request.update(query, update, options, function(err, request) {
			if(err) res.send(err);
			console.log(req.body);
			res.json(request);
        });
    });

};