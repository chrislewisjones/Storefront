-- DROP DATABASE IF EXISTS bamazonDB;
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

INSERT INTO products (product_name, depatrment_name, price, stock_quantity)
VALUES ("Hat", Clothing, 12.50, 100), ("Gloves", Clothing, 10.00, 100), ("TV", Electronics, 500, 25),