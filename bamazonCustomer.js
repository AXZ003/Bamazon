var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");
var chalk = require('chalk');

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  // runTable();
  connection.query("SELECT * FROM products", function (error, response) {

    var table = new Table({
    head: ['ID', 'Department Name','Product Name','Price','Stock Quantity'], colWidths: [5, 20, 20, 10, 15]

    });
   

    for (var i = 0; i < response.length; i++) {
    table.push([response[i].item_id, response[i].department_name, response[i].product_name, response[i].price, response[i].stock_quantity])
    }
    console.log(table.toString());
      startUp();
  
  })
});
  



// START FUNCTION 

function startUp() {
    inquirer
      .prompt([{   
      type: 'input',
			name: 'itemID',
            message: 'Which item ID would you like to buy (Ctrl + C to exit)?'
      },{
        type: 'input',
        name: 'quantity',
        message: 'How many would you like to buy?'
      }]).then(function (response) {
        connection.query('SELECT * FROM products WHERE ?', {item_id: response.itemID}, function(err, rows, fields) {
          if (err) throw err;
  
            //If user input quantity is less than or equal to the stock quantity, allow purchase
            if (response.quantity <= rows[0].stock_quantity) {
              //Calculate total cost of transaction
              var cost = response.quantity * rows[0].price;
              console.log(chalk.green("Thanks for your purchase! Your order total is: $ " + cost));
              //Calculate the new available quantity after purchase
              var updateQuantity = rows[0].stock_quantity - response.quantity; 
              // console.log(updateQuantity)
            
              //Update the product table with the new quantity
              connection.query('UPDATE products SET ? WHERE ?', [{stock_quantity: updateQuantity}, 
                {item_id: response.itemID}], function(err,rows,fields) {
                if (err) throw err;
                  

              }); 
            } else {
              console.log(response)
                console.log(chalk.magenta('Not enough items in stock.'));
                process.exit();
                fail();
                } 
        })
  });
 
  
} 

function yaas() {
  runTable();
  inquirer
    .prompt([
           {name: "YAAS",
            type: "confirm",
            message: "Would you like to make another purchase?"
           }
    ]).then(function (answer) {
               switch (answer.confirm) {
                  case true:
                      // runTable();
                      break;
                  case false:
                  console.log(chalk.yellowBright("See ya!"))
                      process.exit();
                      break;
               }
           })
}

function fail() {
  inquirer
    .prompt([{
          name: "list",
          type: "list",
          message: "What would you like to do?",
          choices: ["Purchase a different item or less of this item","Come back later"]
    }]).then(function (answer) {
          switch (answer.list) {
            case "Purchase a different item or less of this item":
                runTable();
                break;

            case "Come back later":
                console.log(chalk.yellowBright("See ya!"))
                process.exit();
                break;
          }
      })
}

///Table Function 

function runTable() {
  connection.query("SELECT * FROM products", function (error, response) {

    var table = new Table({
    head: ['ID', 'Department Name','Product Name','Price','Stock Quantity'], colWidths: [5, 20, 20, 10, 15]

    });
   

    for (var i = 0; i < response.length; i++) {
    table.push([response[i].item_id, response[i].department_name, response[i].product_name, response[i].price, response[i].stock_quantity])
    }
    console.log(table.toString());
      // startUp();
  
  })
}
