/**
 * Express application server handling all client requests
 *
 *
 */
var express        = require('express')
    , app          = express()
    , bodyParser   = require('body-parser')
    , compress     = require('compression')
    , favicon      = require('static-favicon')
    , fileServer   = require('serve-static')
    , logger       = require('morgan')
    , mongo        = require('mongodb')
    , mongoose     = require('mongoose')
    , jwt          = require('jsonwebtoken')

    , config       = require('./config')
    , User         = require('./models/user')
    , jobs         = require('./models/jobs')
    , port         = process.env.PORT || 3010;


mongoose.connect(config.database); // connect to database
app.set('superSecret', config.secret); // secret variable

app.use( favicon());
app.use(logger('dev'));
app.use(compress());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Support static file content
app.use( fileServer( __dirname+'/../client' )); // was fileServer( process.cwd() )

app.get('/', function(req, res) {
    res.send('Hello! The API is at http://localhost:' + port + '/api');
});

app.get('/setup', function(req, res) {

  // create a sample user
  var nick = new User({ 
    name: 'Nick Cerminara',
    password: 'password',
    admin: true
  });

  // save the sample user
  nick.save(function(err) {
    if (err) throw err;

    console.log('User saved successfully');
    res.json({ success: true });
  });
});


app.listen(port, function() {
    console.log('env = ' + app.get('env') +
        '\n__dirname = ' + __dirname +
        '\nprocess.cwd = ' + process.cwd() +
        '\nNode Server is listening on port ' + port);
});
