var express = require('express');
var router = express.Router();
const mysql = require('mysql2');

/* GET users listing. */
router.get('/', function(req, res, next) {
req.app.locals.con.connect(function(err){
  if(err){
    console.log(err)
  }
  let userName = "Mari";
  let password = "test";
  let fullName = "Mari Artho";
  //Send data to database
  let sql = `
    INSERT INTO users( userName, password, fullName) 
    VALUES("${userName}","${password}", "${fullName}")
  `

  //let sql = ` SELECT * FROM note `


  req.app.locals.con.query(sql, function(err, result){
    if(err){
      console.log(err);
    }
    console.log("result", result);
   // res.send(result);
  })
})
  res.send('respond with a resource');
});

module.exports = router;
