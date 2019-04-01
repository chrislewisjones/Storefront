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
  console.log("Welcome, connected as id " + connection.threadId + "\n");
  Start();
});

// function start() {}
// show inventory
// prompt the customer with two questions
inquirer.prompt([
  {
    type: "number",
    message: "Please enter the ID of the item that you would like to purchase:",
    name: "id"
  },
  {
    type: "number",
    message: "Please enter the quantity:",
    name: "quantity"
  }
]);
