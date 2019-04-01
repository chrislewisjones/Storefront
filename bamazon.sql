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

