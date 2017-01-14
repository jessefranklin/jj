var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/jj');

// CONNECTION EVENTS
mongoose.connection.on('connected', function() {
  console.log('Mongoose connected to db jj');
});
mongoose.connection.on('error', function(err) {
  console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function() {
  console.log('Mongoose disconnected');
});