-- Drops the animals_db if it exists currently --
DROP DATABASE IF EXISTS bamazon;
-- Creates the "animals_db" database --
CREATE DATABASE bamazon;

-- Makes it so all of the following code will affect animals_db --
USE bamazon;

CREATE TABLE products (
  item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
  department_name VARCHAR(30),
  product_name VARCHAR(30),
  price INTEGER(10),
  stock_quantity INTEGER(10),
  PRIMARY KEY (item_id)
);
