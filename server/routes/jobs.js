var JobModel = require('../models/jobSchema');

module.exports = function (app) {
	app.get('/api/jobs', function (req, res) {
        JobModel.find(function(err, jobs) {
			if(err) res.send(err);
			res.json(jobs);
        });
    });

    app.post('/api/jobs', function(req, res){
		JobModel.create(req.body, function (err, jobs){
			if (err) res.send(err);
			console.log(jobs);
			res.json(jobs);
		});
    });

    app.get('/api/jobs/:id', function (req, res) {
        JobModel.find({_id:req.params.id},function(err, jobs) {
			if(err) res.send(err);
			res.json(jobs);
        });
    });

    app.delete('/api/jobs/:id', function (req, res) {
		console.log(req);
        JobModel.remove({
			_id: req.params._id
        },function(err, jobs) {
			if (err) res.send(err);
			console.log(jobs);
        });
    });
};