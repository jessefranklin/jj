var requestModel = require('../models/requestSchema');

module.exports = function (app) {
	// Get all request
	app.get('/api/request', function (req, res) {
        requestModel.find(function(err, request) {
			if(err) res.send(err);
			res.json(request);
        });
    });

	// Create request
    app.post('/api/request', function(req, res){
		requestModel.create(req.body, function (err, request){
			if (err) res.send(err);
			console.log(request);
			res.json(request);
		});
    });

    // Get request by id
    app.get('/api/request/:id', function (req, res) {
        requestModel.find({_id:req.params.id},function(err, request) {
			if(err) res.send(err);
			res.json(request);
        });
    });

    // Get all requests by Post id
    app.get('/api/getpostrequests/:id', function (req, res) {
        requestModel.find({_id:req.params.id},function(err, request) {
			if(err) res.send(err);
			res.json(request);
        });
    });

    // Edit request
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

    // Delete request
    app.delete('/api/request/:id', function (req, res) {
        requestModel.remove({
			_id: req.params.id
        },function(err, request) {
			if (err) res.send(err);
			console.log(request);
			res.json('completed');
        });
    });

};