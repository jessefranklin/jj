/**
 * Express application server handling all client requests
 *
 */
var express        = require('express')
    , app          = express()
    , path         = require('path')
    , bodyParser   = require('body-parser')
    , compress     = require('compression')
    , favicon      = require('static-favicon')
    , fileServer   = require('serve-static')
    , logger       = require('morgan')
    , mongo        = require('mongodb')
    , mongoose     = require('mongoose')
    , jwt          = require('jsonwebtoken')
    , port         = process.env.PORT || 3010;


app.use( favicon());
app.use(logger('dev'));
app.use(compress());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});



// Support static file content
app.use( fileServer( __dirname+'/../client' )); // was fileServer( process.cwd() )

require('./models/db');
require('./routes/jobs')(app);

app.use(function(req, res) {
  res.sendFile(path.join(__dirname, '/../client', 'index.html'));
});


app.listen(port, function() {
    console.log('env = ' + app.get('env') +
        '\n__dirname = ' + __dirname +
        '\nprocess.cwd = ' + process.cwd() +
        '\nNode Server is listening on port ' + port);
});
