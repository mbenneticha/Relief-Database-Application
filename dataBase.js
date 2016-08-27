var mysql = require('mysql');
var pool = mysql.createPool({
  host  : "52.40.47.174",
  user  : "frontend",
  password: "secretTMW",
  database: "tmw"
});

module.exports.pool = pool;
