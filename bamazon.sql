DROP DATABASE IF EXISTS bamazonDB;
CREATE database bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  item_id integer not null auto_increment,
  product_name VARCHAR(50) not null,
  department_name VARCHAR(50) not null,
  price DECIMAL(10,2) not null,
  stock_quantity INT NULL,
  PRIMARY KEY (item_id)
);

SELECT * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Coffee", "Beverages", 12.50, 100), 
("Milk", "Dairy", 5.95, 100), 
("Bread", "Bakery", 2, 200),
("Dog Food", "Pet Supplies", 30, 25),
("Heroin", "Pharmaceuticals", 50, 8);
