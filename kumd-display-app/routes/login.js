var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('login/login');
});

router.get('/account', function(req, res, next) {
    res.render('login/account_menu');
});

router.get('/account/new', function(req, res, next) {
    res.render('login/account_new');
});

router.get('/account/edit', function(req, res, next) {
    res.render('login/account_edit');
});

router.get('/account/comment', function(req, res, next) {
    res.render('login/account_comment');
});

router.get('/host',function(req,res,next){
    res.render('host/host_menu');
});

router.get('/host/paint',function(req,res,next){
    res.render('host/host_paint');
});

router.get('/host/demo',function(req,res,next){
    res.render('host/host_demo');
});

router.get('/host/other',function(req,res,next){
    res.render('host/host_other');
});

router.get('/host/comment',function(req,res,next){
    res.render('host/host_comment');
});

module.exports = router;