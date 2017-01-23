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
    , multer       = require('multer')
    , aws          = require('aws-sdk')
    , multerS3     = require('multer-s3')
    , fs           = require('fs')
    , jwt          = require('jsonwebtoken')
    , port         = process.env.PORT || 3010;


app.use( favicon());
app.use(logger('dev'));
app.use(compress());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//todo switch to use AWS for image uploading
// var s3 = new aws.S3({
//     apiVersion: '2007-01-17',
//     params: {Bucket: joejbs}
// });
// AWS.config.loadFromPath('./config.json');
// var upload = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: 'joejbs',
//     metadata: function (req, file, cb) {
//       cb(null, {fieldName: file.fieldname});
//     },
//     key: function (req, file, cb) {
//       cb(null, Date.now().toString())
//     }
//   })
// });
// app.post('/upload', upload.array('photos', 3), function(req, res, next) {
//   res.send('Successfully uploaded ' + req.files.length + ' files!')
// })


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './client/uploads/');
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
    }
});

var upload = multer({
    storage: storage
}).single('file');

app.post('/upload', function(req, res) {
    upload(req,res,function(err){
        console.log(req.file);
        if(err){
            console.log(err);
            res.json({error_code:1,err_desc:err});
            return;
        }
        res.json({error_code:0,err_desc:err,data:req.file});
    });
});

app.use( fileServer( __dirname+'/../client' ));
require('./models/db');
require('./routes/jobs')(app);
require('./routes/users')(app);
require('./routes/request')(app);

app.use(function(req, res) {
  res.sendFile(path.join(__dirname, '/../client', 'index.html'));
});

app.listen(port, function() {
    console.log('env = ' + app.get('env') +
        '\n__dirname = ' + __dirname +
        '\nprocess.cwd = ' + process.cwd() +
        '\nNode Server is listening on port ' + port);
});
