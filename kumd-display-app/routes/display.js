var express = require('express');
var router = express.Router();
const USERDATA = require('../public/information/user_info').userInformation;
const LIST = require('../public/information/list').LIST;

/* GET home page. */
router.get('/', function(req, res, next) {
  let data = [[],[],[],[],[],[]];
  for(var paint in USERDATA ){
    data[parseInt( USERDATA[paint].grade)-1].push(USERDATA[paint]);
  }
  for(var i in data){
    data[i].sort((a,b)=>{
      if(a.size > b.size){
        return 1;
      }else{
        return -1;
      }
    });
  }
  console.log(data);
  res.render('display/index', { data: data, list:LIST });
});

module.exports = router;