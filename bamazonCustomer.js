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
  startCustomer();
});

// show inventory
// prompt the customer with two questions

function startCustomer() {
  connection.query("SELECT * FROM products", function(err, result) {
    if (err) throw err;
    console.log("Welcome to Bamazon! On sale today:");
    console.table(result);
    sale();
  });
}

function sale() {
  inquirer
    .prompt([
      {
        type: "input",
        message:
          "Please enter the ID of the item that you would like to purchase:",
        name: "id"
      },
      {
        type: "input",
        message: "Please enter the quantity:",
        name: "qty"
      }
    ])
    .then(function(stockcheck) {
      connection.query(
        "SELECT * FROM products WHERE item_id=?",
        stockcheck.id,
        function(err, result) {
          for (var i = 0; i < result.length; i++) {
            if (stockcheck.qty > result[i].stock_quantity) {
              console.log("Sorry, not enough in stock, please try again");
            } else {
              console.log("Added to cart");
            }
          }
        }
      );
    });
}
