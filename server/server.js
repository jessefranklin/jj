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
    , jobs         = require('./jobs')
    , port         = process.env["PORT"] || 7999;


app.use( favicon());
app.use( logger('dev'));
app.use( compress());
app.use( bodyParser()); // both json & urlencoded

// Support static file content
app.use( fileServer( __dirname+'/../client' )); // was fileServer( process.cwd() )

app.listen(port, function() {
    console.log('env = ' + app.get('env') +
        '\n__dirname = ' + __dirname +
        '\nprocess.cwd = ' + process.cwd() +
        '\nNode Server is listening on port ' + port);
});
