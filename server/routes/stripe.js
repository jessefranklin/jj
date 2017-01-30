var stripe = require("stripe")(
  "sk_test_0cZVhmOMFxWEZWHJyj4tSuke"
);

module.exports = function (app) {
	
	// Get all jobs
	app.post('/api/payment', function (req, res) {
		var token = req.body.stripeToken;
		var useremail = req.body.email;

		stripe.customers.create({
			email: useremail,
			source: token
		}).then(function(customer) {
			res.json(customer);
		});

    });

	app.post('/api/processpayment', function (req, res) {
		stripe.charges.create(req.body).then(function(charge) {
			console.log(charge);
		});

	});

};