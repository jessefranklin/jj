var AccountingModel = require('../models/accountingSchema');

module.exports = function (app) {

	// Create accounting
    app.post('/api/accounting', function(req, res){
		AccountingModel.create(req.body, function (err, accounting){
			if (err) res.send(err);
			console.log(accounting);
			res.json(accounting);
		});
    });

    // Get ratings and reviews for user
    app.get('/api/accounting/:id', function (req, res) {
        AccountingModel.find({'user_id':req.params.id},function(err, accounting) {
			if(err) res.send(err);
			res.json(accounting);
        });
    });

    // Add accounting to array
    app.put('/api/addtoaccounting/:id/:type', function (req, res) {
		var key = req.params.type, push = {};
		push[key] = req.body;
		var query = {'user_id':req.params.id},
		update = {
			$push : push
		},
		options = { "multi": true };
        AccountingModel.update(query, update, options, function(err, accounting) {
			if(err) res.send(err);
			res.json(accounting);
        });
    });

};