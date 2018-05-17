var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 8000,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazonDB"
});