var express = require('express');
var router = express.Router();
const mysql = require('mysql2');

router.get('/', function(req,res){
    res.send('ユーザーがドキュメントをAddするページだよ！')
});

// //add document
// router.post("/document", (req, res)=> {
//     console.log('document.jsですよー');
//     res.redirect("/users")

// })

module.exports = router;