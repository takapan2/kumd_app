var express = require('express');
var router = express.Router();
const DEMODATA = require('../public/information/demo_data').demodata;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('display/index', { demoData:DEMODATA });
});

router.get('/submit',function(req,res,next){
  res.render('thanks');
})

module.exports = router;