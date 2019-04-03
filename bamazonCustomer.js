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

function startCustomer() {
  connection.query("SELECT * FROM products", function(err, result) {
    if (err) throw err;
    console.log("Welcome to Bamazon! On sale today:");
    console.table(result);
    cart();
  });
}

function cart() {
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
              console.log("Added to your cart:");
              console.log("Item: " + result[i].product_name);
              console.log("Quantity: " + stockcheck.qty);
              console.log("Price: " + result[i].price);
              console.log("Total: " + result[i].price * stockcheck.qty);

              checkout();
            }
          }
        }
      );
    });
}

function checkout() {
  inquirer
    .prompt([
      {
        type: "confirm",
        message: "Please confirm your purchase",
        name: "confirm",
        default: true
      }
    ])
    .then(function(confirm) {
      if (confirm.confirm === true) {
        console.log("Your purchase is on it's way");
      } else {
        console.log("Ok, come again");
      }
    });
}
