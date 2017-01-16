var JobModel = require('../models/jobSchema');

module.exports = function (app) {
	app.get('/api/jobs', function (req, res) {
        JobModel.find(function(err, jobs) {
			if(err) res.send(err);
			console.log(jobs);
			res.json(jobs);
        });
    });

    app.post('/api/jobs', function(req, res){
		console.log(req);
		JobModel.create(req.body, function (err, jobs){
			if (err) res.send(err);
			console.log(jobs);
		});
    });

    app.put('/api/jobs/:job_id', function(req, res){
		JobModel.findByIdAndUpdate(req.params.id, req.body, function (err, jobs){
			if (err) res.send(err);
			res.json(post);
		});
    });

    app.delete('/api/jobs/:job_id', function (req, res) {
		console.log(req);
        JobModel.remove({
			_id: req.params.job_id
        },function(err, jobs) {
			if (err) res.send(err);
			console.log(jobs);
        });
    });
};