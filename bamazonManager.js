var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "RootRoot",
  database: "bamazonDB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connection made as id " + connection.threadId + "\n");
  startManager();
});

function startManager() {
  connection.query("SELECT * FROM products", function(err, result) {
    if (err) throw err;
    console.log("Welcome to BAMazon! On sale today:");
    console.table(result);
  });
}
