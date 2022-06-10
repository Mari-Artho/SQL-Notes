var express = require('express');
var router = express.Router();
const mysql = require('mysql2');

//Log in
router.post('/', function(req,res){
    let con = req.app.locals.con;

    con.connect(function(err){
        if(err){
            console.log("ログインエラー" ,err);
        }
        console.log(req.body);

        //avoid sql injections.
        let sql = `SELECT * FROM users WHERE userName = ? AND password = ?`
        let query = con.format(sql, [req.body.userName, req.body.password]);
        con.query(query, function(err, response){
            if(err){
                console.log(err);
            }
            console.log(response);
            res.send(response[0]);
            //res.send('ログインできない！！')
        })
    })
    //res.send('respond with a resource');
})

module.exports = router;