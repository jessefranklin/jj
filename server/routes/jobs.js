var JobModel = require('../models/jobSchema');

module.exports = function (app) {
	// Get all jobs
	app.get('/api/jobs', function (req, res) {
        JobModel.find(function(err, jobs) {
			if(err) res.send(err);
			res.json(jobs);
        });
    });

	// Create job
    app.post('/api/jobs', function(req, res){
		JobModel.create(req.body, function (err, jobs){
			if (err) res.send(err);
			console.log(jobs);
			res.json(jobs);
		});
    });

    // Get job by id
    app.get('/api/jobs/:id', function (req, res) {
        JobModel.find({_id:req.params.id},function(err, jobs) {
			if(err) res.send(err);
			res.json(jobs);
        });
    });

    // Get all jobs by owner
    app.get('/api/myjobs/:id', function (req, res) {
        JobModel.find({'owner':req.params.id},function(err, jobs) {
			if(err) res.send(err);
			res.json(jobs);
        });
    });

    // Edit job
    app.put('/api/jobs/:id', function (req, res) {
		var query = {_id:req.params.id},
		update = {
			"$set": req.body
		},
		options = { "multi": true };
        JobModel.update(query, update, options, function(err, jobs) {
			if(err) res.send(err);
			console.log(req.body);
			res.json(jobs);
        });
    });

    // Add applicant
    app.put('/api/jobapply/:id', function (req, res) {
        JobModel.findByIdAndUpdate(
			req.params.id,
			{$push: {"applicants": req.body }},
			{safe: true, upsert: true},
			function(err, jobs) {
				if(err) res.send(err);
				console.log(req.body);
				res.json(jobs);
			}
        );
    });

    // Delete job
    app.delete('/api/jobs/:id', function (req, res) {
        JobModel.remove({
			_id: req.params.id
        },function(err, jobs) {
			if (err) res.send(err);
			console.log(jobs);
			res.json('completed');
        });
    });

};