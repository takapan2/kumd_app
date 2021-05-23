var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('display/index');
});

router.get('/submit',function(req,res,next){
  res.render('thanks');
});

router.get('/ranking',function(req,res,next){
  res.render('display/ranking');
});

router.get('/sorry',function(req,res,next){
  res.render('sorry');
});

module.exports = router;