var mysql = require("mysql");
var connection = mysql.createPool({
 connectionLimit: 100,
 host:"localhost",
 user:"root",
 password:"****",
 database:"sampleid",
 port: 3306,
 timeout: 1000000,
 debug: false,
 multipleStatements: true
});
module.exports.connection = connection;