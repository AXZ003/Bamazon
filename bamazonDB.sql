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

SELECT * FROM products;

INSERT INTO products(department_name,product_name, price, stock_quantity)
VALUES ("Lips","Velvet Lip Kit", 29, 130);


INSERT INTO products(department_name,product_name, price, stock_quantity)
VALUES ("Lips","Matte Lip Kit", 29, 400);

INSERT INTO products(department_name,product_name, price, stock_quantity)
VALUES ("Lips","Creme Lipstick", 17, 600);

INSERT INTO products(department_name,product_name, price, stock_quantity)
VALUES ("Lips", "Glosses", 15, 100);

INSERT INTO products(department_name,product_name, price, stock_quantity)
VALUES ("Face","Face Palette", 48, 300);

INSERT INTO products(department_name,product_name, price, stock_quantity)
VALUES ("Face","Powder Highlighter", 14, 130);

INSERT INTO products(department_name,product_name, price, stock_quantity)
VALUES ("Face","Concealer", 20, 1000);

INSERT INTO products(department_name,product_name, price, stock_quantity)
VALUES ("Eyes","Eyeshadow Palette", 45, 1200);

INSERT INTO products(department_name,product_name, price, stock_quantity)
VALUES ("Eyes","Eyeliner", 10, 300);

INSERT INTO products(department_name,product_name, price, stock_quantity)
VALUES ("Eyes","Glitter Eyes", 40, 800);


SELECT * FROM products;

