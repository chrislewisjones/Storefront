var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");
const chalk = require("chalk");

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
    console.log(chalk.blue.bold("Welcome to Bamazon! On sale today:"));
    renderTable(result);
    cart();
  });
}

function renderTable(result) {
  var table = new Table({
    head: ["ID", "Item", "Department", "Price", "Stock"],
    colWidths: [5, 25, 25, 10, 10],
    style: { head: ["green"] }
  });
  for (var item of result) {
    table.push([
      item.item_id,
      item.product_name,
      item.department_name,
      "$" + item.price.toFixed(2),
      item.stock_quantity
    ]);
  }
  console.log(table.toString());
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
              console.log(
                chalk.red.bold("Sorry, not enough in stock, please try again")
              );
              proceed();
            } else {
              console.log("========================");
              console.log(chalk.green.bold("Added to your cart:"));
              console.log("Item: " + result[i].product_name);
              console.log("Quantity: " + stockcheck.qty);
              console.log("Price: " + "$" + result[i].price.toFixed(2));
              console.log("------------------------");
              console.log(
                "Total: " + "$" + (result[i].price * stockcheck.qty).toFixed(2)
              );
              console.log("========================");

              var purchaseId = stockcheck.id;
              var newQty = result[i].stock_quantity - stockcheck.qty;

              checkout(purchaseId, newQty);
            }
          }
        }
      );
    });
}

function checkout(purchaseId, newQty) {
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
        connection.query(
          "UPDATE products SET ? WHERE ?",
          [
            {
              stock_quantity: newQty
            },
            {
              item_id: purchaseId
            }
          ],
          function(err, res) {}
        );
        console.log(chalk.green.bold("Your purchase is on it's way"));
        proceed();
      } else {
        console.log(chalk.red.bold("Your cart has been emptied"));
        proceed();
      }
    });
}

function proceed() {
  inquirer
    .prompt([
      {
        type: "confirm",
        message: "Would you like to continue shopping?",
        name: "proceed",
        default: true
      }
    ])
    .then(function(proceed) {
      if (proceed.proceed === true) {
        startCustomer();
      } else {
        process.stdout.write("\033c");
        console.log("Thank you, please come back soon!");
        process.exit();
      }
    });
}
