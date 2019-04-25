var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root123",
  database: "abc"
});

con.connect(function(err) {
  if (err) throw err;
  //Update the address field:
  var sql = "UPDATE latex SET Count = 5 WHERE id=2;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result.affectedRows + " record(s) updated");
  });
});
