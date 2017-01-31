var AccountingModel = require('../models/accountingSchema');
var UserModel = require('../models/userSchema');

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

		pushAverage(req.params.pid,'earned');
    });


    // Push average rating to user obj
	var pushAverage = function(id,type) {
		AccountingModel.aggregate([
			{ $unwind:'$'+type},
			{ $group: {
					"_id": {
						"_id": "$_id",
						"user_id": id
					},
					"total_earned":{
						"$push": '$'+type
					},
					"balance": {
						"$sum": '$'+type+'.amount'
					}
				}
			},
			{ "$project": {
				"_id": 0,
				"user_id": "$_id.user_id",
				"balance": 1,
				"total_earned" : 1
			}}], function (err, result) {
				if (err) {
					console.log(err);
					return;
				}

			console.log(result[0].balance);
			var query = {'user_id':result[0].user_id},
			update = {
				"$set": { "accounting" : { 'balance' :result[0].balance } }
			},
			options = { "multi": true };
			UserModel.update(query, update, options, function(err, user) {
				//console.log(user);
			});
		});
	};

};