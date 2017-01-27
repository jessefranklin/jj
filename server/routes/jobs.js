var JobModel = require('../models/jobSchema');
var requestModel = require('../models/requestSchema');

module.exports = function (app) {
	// Get all jobs
	app.get('/api/jobs', function (req, res) {
        JobModel.find({'status':'open'},function(err, jobs) {
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
			var newJobs = [];
			var len = jobs.length;
    		var curIdx = 0;
			jobs.forEach(function(job){
				requestModel.find({'job_id':job._id }, function(err,req) {
					job.set('req', req, {strict: false})
					newJobs.push(job);
					++curIdx;
					if (curIdx == len) {
                        res.json(newJobs);
                    }
				});
			});
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
				res.json(jobs);
			}
        );
    });

    // Add applicant
    app.put('/api/jobremove/:id', function (req, res) {
        JobModel.findByIdAndUpdate(
			req.params.id,
			{$pull: {"applicants": req.body }},
			{safe: true, upsert: true},
			function(err, jobs) {
				if(err) res.send(err);
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

    //Using $geonear
    app.get('/api/jobs/near/', function (req, res) {
		var lat = req.body.lat,
		long = req.body.long;
		JobModel.aggregate([{
		"$geoNear": {
			"near": {
				"type": "Point",
				"coordinates": [long,lat]
				},
			"distanceField": "distance",
			"sperical": true,
			"maxDistance": 10000
			}
		}],
		function(err,results) {
			res.json(results);
		});
		//.find({loc: {$near: [-122.418,37.775], $maxDistance:10/69 } })
	});

};