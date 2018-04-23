var express = require('express');
var router = express.Router();
const spoj = require('./spoj_scraper');
var codeforces = require('./codeforces_scraper');


router.get('/spoj' , (req,res) => {
  var username1 = req.query.handle1;
  var username2 = req.query.handle2;
  spoj.spojFunc(username1,username2 , (err,data)=>{
    if(err) {
      console.log(err);
      return err;
    }
    else {
      res.send(data);
    }
  });
});

router.get('/codeforces',function(req,res) {
  var username = req.query.handle;
  codeforces.codeforcesFunc(username , (err,data)=>{
    if(err) {
      console.log(err);
      return err;
    }
    else {
      res.send(data);
    }
  });
})
/*router.get('/spoj',function(req, res, next) {
  var url = "http://www.spoj.com/users/subodra_9/";
  var job;
  request(url,(err,res,body) => {
    var $ = cheerio.load(body);

    var problems = $('table.table.table-condensed');
    var problemsText = problems.text();

    var todo = $('table.table');
    var todoText = todo.text();

    job = problemsText;
    
  })
});

router.get('/pinterest',(req,res,next) => {
  
})*/

module.exports = router;
