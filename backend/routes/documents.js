var express = require('express');
const req = require('express/lib/request');
var router = express.Router();
const mysql = require('mysql2');

router.get('/:id', function(req, res, next) {
    let con = req.app.locals.con;
    console.log(req.params.id);
    con.connect(function(err) {
        if (err) {
            console.log(err)
        }

        let sql = `SELECT * FROM documents ` +
        `INNER JOIN authorship ON authorship.documentID=documents.ID AND ` +
        `authorship.authorID = ?`
        let query = con.format(sql, [req.params.id]);
        con.query(query, function(err, result) {
            if (err) {
                console.log(err)
            }
            res.send(result)
        })
    })
})

router.post('/update', function(req, res) {
    console.log("Update: " + req.body.id + ": " + req.body.title)
    let con = req.app.locals.con;
    con.connect(function(err) {
        if (err) {
            console.log(err)
        }
        let sql = `UPDATE documents SET title = ?, content = ? ` +
        `WHERE documents.id = ?`;
        let query = con.format(sql, [req.body.title, req.body.content, req.body.id]);
        con.query(query, function(err, result) {
            if (err) {
                console.log(err)
            }
        })
    })
})

router.post('/new', function(req, res) {
    console.log("New: " + req.body.userId + "'s " + req.body.title)
    let con = req.app.locals.con;
    con.connect(function(err) {
        if (err) {
            console.log(err)
        }
        let sql = `INSERT INTO documents (id, title, content)` +
        `VALUES (NULL, ?, ?)`
        // create new document in database with ID, title, content
        let query = con.format(sql, [req.body.title, req.body.content]);
        con.query(query, function(err, result) {
            if (err) {
                console.log(err)
            }
            console.log("result", result);
            // TODO: read response: JSON that includes ID
            let sql2 = `INSERT INTO authorship (authorID, documentID) VALUES (?, ?);`
            // link document to current user
            let ID = result.insertId
            let query2 = con.format(sql2, [req.body.userId, ID /*documentID*/])
            con.query(query2, function(err) {
                if (err) {
                    console.log(err)
                }
            })
        });
        res.send("ok")
    })
})

//connect document data to database. AでDBへデータが送られているぞ？
router.get('/', function(req, res){
    req.app.locals.con.connect(function(err){
        if(err){
            console.log(err);
        }
        //A.
        let title = 'document 2';
        let content = ' document content2';
        // let sql = `INSERT INTO documents(title, content)
        //              VALUES("${title}", "${content}")`
        let sql = `SELECT * FROM documents`;
        req.app.locals.con.query(sql, function(err,result){
            if(err){
                console.log(err);
            }
            console.log("result", result);
            res.send(result);
        })
        //res.send("Hello World!")
    })

})


module.exports = router;