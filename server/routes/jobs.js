var express        = require('express')
    , mongoose     = require('mongoose')
    , router       = express.Router();

router.get('/posts',function(req,res){
    mongoose.model('posts').find(function(err, posts){
        res.send(posts);
    });
});

router.get('/posts/:userId',function(req,res){
    mongoose.model('posts').find({user: req.params.userId},function(err, posts){
        res.send(posts);
    });
});

module.exports = router;