var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;
 
var server = new Server('localhost', 27017, {safe:false,auto_reconnect: true});
db = new Db('jdb', server);
 
db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'jdb' database");
        db.collection('jobs', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'jobs' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    }
});
 
exports.findAll = function(req, res) {
    db.collection('jobs', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

var populateDB = function() {
 
    var jobs = [
    {
    'name': 'Tom',
    'serviceName': 'Help Move',
    'dateRequired':'Feb 15, 2014',
    'serviceDesc': 'Need help moving fridge out of house',
    'location': {
        'address': '21 Ruttan St.',
        'lat': '48.444514',
        'long': '-89.217045',
        'majorIntersection':'Dundas / Bloor'
    },
    'cost': {
        'type':'Fixed',
        'hours':'4-6',
        'amount':'90'
    },
    'category': 'Manual Labour, Junk Removal'
    }];
 
    db.collection('jobs', function(err, collection) {
        collection.insert(jobs, {safe:true}, function(err, result) {});
    });
 
};