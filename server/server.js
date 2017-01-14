/**
 * Express application server handling all client requests
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
    , fs           = require('fs')
    , config       = require('./config')
    , port         = process.env.PORT || 3010;


app.use( favicon());
app.use(logger('dev'));
app.use(compress());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Support static file content
app.use( fileServer( __dirname+'/../client' )); // was fileServer( process.cwd() )

require('./models/db');

fs.readdirSync(__dirname+'/models').forEach(function(filename) {
    if(~filename.indexOf('.js')) require(__dirname+'/models/'+filename);
});

var routesApi = require('./routes/jobs');

app.use('/api', routesApi);



app.listen(port, function() {
    console.log('env = ' + app.get('env') +
        '\n__dirname = ' + __dirname +
        '\nprocess.cwd = ' + process.cwd() +
        '\nNode Server is listening on port ' + port);
});
