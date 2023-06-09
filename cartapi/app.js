var express = require("express");
var cors = require("cors");
var app = express();
var mysql= require("mysql.js")
app.listen(3000);
app.use( express.static("public")  );
app.use( express.json() );
app.use( express.urlencoded( {extended: true}) );
app.use(cors());


conn.connect(function (err) {
    console.log(err);
})

app.get("/todo/list", function (req, res) {
    conn.query("select * from orders", [],
        function (err, rows) {
            res.send( JSON.stringify(rows) );
        }
    )
})

app.get("/todo/item/:id", function (req, res) {
    conn.query("select * from orders where member_id = ?", 
        [req.params.id],
        function (err, rows) {
            res.send( JSON.stringify(rows[0]) );
        }
    )
})

app.post("/todo/create", function (req, res) {
    conn.query("insert into todoTable (title, isComplete) values (?, ?)", 
        [req.body.title, req.body.isComplete],
        function (err, rows) {
            res.send( JSON.stringify( req.body ));
        }
    )

})

app.put("/todo/item", function (req, res) {
    conn.query("update todoTable set title= ?, isComplete = ? where todoTableId = ?", 
        [req.body.title, req.body.isComplete, req.body.todoTableId],
        function (err, rows) {
            res.send( JSON.stringify( req.body ));
        }
    )

})

app.delete("/todo/delete/:id", function (req, res) {
    conn.query("delete from todoTable where todoTableId = ?",
        [req.params.id], 
        function (err, rows) {
            res.send("#" + req.params.id + " deleted");
        }
    )
})
