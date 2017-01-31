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
    app.put('/api/addtoaccounting/:oid/:pid', function (req, res) {
		var key = 'paid', push = {};
		push[key] = req.body;
		var query = {'user_id':req.params.oid},
		update = {
			$push : push
		},
		options = { "multi": true };
        AccountingModel.update(query, update, options, function(err, accounting) {
			if(err) res.send(err);
			
        });

        var pkey = 'earned', ppush = {};
		ppush[pkey] = req.body;
		var pquery = {'user_id':req.params.pid},
		pupdate = {
			$push : ppush
		},
		poptions = { "multi": true };
        AccountingModel.update(pquery, pupdate, poptions, function(err, accounting) {
			if(err) res.send(err);
        });
    });

};