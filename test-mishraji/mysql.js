var http = require("http");
var express = require('express');
var app = express();
var mysql      = require('mysql');
var bodyParser = require('body-parser');
var connection = mysql.createConnection({
 host     : 'localhost',
 user     : 'root', 
 password : 'root123', 
 database : 'abc' 
});


connection.connect(function(err) {
 if (err) throw err
 console.log('You are now connected with mysql database...')
})
app.use( bodyParser.json() );       
app.use(bodyParser.urlencoded({  
 extended: true
}));


var server = app.listen(3301,  "127.0.0.1", function () {
 var host = server.address().address
 var port = server.address().port
 console.log("latex api app listening at http://%s:%s", host, port)
});


app.post('/latex/update/:name', function (req, res) {
 console.log('name::'+req.params.name);
     connection.query('UPDATE latex SET  Count=Count+1 where name =?',[req.params.name], function (error, results) {
   if (error) throw error;
     res.end(JSON.stringify(results));
	});
});
//rest api to create a new latex in repo  or increase count if not found
app.post('/latex/check/:name', function (req, res) {
console.log('name::'+req.params.name);
  var rest;
  connection.query('SELECT name FROM latex where name =?',[req.params.name], function (error, results) {
      if (error) throw error;
    //console.log("results=>>>>>>>>",results[0].name);
	  if(results.length<=0){
        connection.query('insert into latex  (Name,Count)VALUES  (?,1)',[req.params.name ], function (error, results) {
            if (error) throw error;
           console.log(results.affectedRows + " record(s) inserted");
            res.end(JSON.stringify(results));    
        });
    }else{
        connection.query('UPDATE latex SET  Count=Count+1 where name =?',[req.params.name], function (error, results) {
        console.log(req.body)
        if (error) throw error;
        res.end(JSON.stringify(results));
            });
    }
	});
});
