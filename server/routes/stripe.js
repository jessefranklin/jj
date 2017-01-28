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
			source: token,
		}).then(function(customer) {
		// YOUR CODE: Save the customer ID and other info in a database for later.
			res.json(customer);
			// return stripe.charges.create({
			// 	amount: 1000,
			// 	currency: "cad",
			// 	customer: customer.id,
			// });

		});

    });

	app.post('/api/processpayment', function (req, res) {
		console.log(req.body);
		stripe.charges.create({
				amount: 1000,
				currency: "cad",
				customer: customerId
		}).then(function(charge) {
			// Use and save the charge info.
			console.log();
		});

	});


	// YOUR CODE (LATER): When it's time to charge the customer again, retrieve the customer ID.
	// stripe.charges.create({
	// amount: 1500, // $15.00 this time
	// currency: "cad",
	// customer: customerId,
	// });
};