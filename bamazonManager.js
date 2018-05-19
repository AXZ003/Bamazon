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

connection.connect(function(err){
    if (err) throw err;
    start();
});

// Create the options 

function start() {
    inquirer.prompt (
        {
            name: 'selection',
            type: 'list',
            message:'Select what you would like to do.',
            choices: ['View Products for Sale', 'View Low Inventory','Add to Inventory','Add New Product']
        
        }).then(function(answer){
            switch (answer.selection) {
                case "View Products for Sale":
                    viewProducts();
                    break;
                case "View Low Inventory":
                    viewLow();
                    break;
                case "Add to Inventory":
                    addInventory();
                    break;
                case "Add New Product":
                    addNew();
                    break;
            }
                    
        });
      
    }




// Functions that will run the choices

function viewProducts() {
    connection.query('SELECT * FROM products', function(err, response){
        if(err) throw err;

        var table = new Table({
            head: ['ID', 'Department Name','Product Name','Price','Stock Quantity'], colWidths: [5, 20, 20, 10, 15]
        
        });
           
        
        for (var i = 0; i < response.length; i++) {
         table.push([response[i].item_id, response[i].department_name, response[i].product_name, response[i].price, response[i].stock_quantity])
        }
            
        console.log(table.toString());

    start();
          
          
    })
}


function viewLow() {
    connection.query('SELECT * FROM products WHERE stock_Quantity < 10', function(err, response) {
        if (err) throw err;
        
        var table = new Table({
            head: ['ID', 'Department Name','Product Name','Price','Stock Quantity'], colWidths: [5, 20, 20, 10, 15]
        
        });

        for (var i = 0; i < response.length; i++) {
            table.push([response[i].item_id, response[i].department_name, response[i].product_name, response[i].price, response[i].stock_quantity])
           }
               
           console.log(table.toString());
   
       start();
             
             
       })

}

function addInventory() {
    connection.query('SELECT * FROM products', function(err, response) {
        if (err) throw err;

        var table = new Table({
            head: ['ID', 'Department Name','Product Name','Price','Stock Quantity'], colWidths: [5, 20, 20, 10, 15]
        
        });

        for (var i = 0; i < response.length; i++) {
            table.push([response[i].item_id, response[i].department_name, response[i].product_name, response[i].price, response[i].stock_quantity])
        }
               
        console.log(table.toString());
        addStock();
    });

    function addStock() {
        inquirer.prompt ([{
                type: 'input',
                name: 'item',
                message: 'What is the item ID for the item you want to add?'
            }, {
                type: 'input',
                name: 'quantity',
                message: 'How many items do you want to add?'
        }]).then (function(response) {
            connection.query("SELECT * FROM products WHERE ? ", [{item_id: response.item}], function (err, rows, fields) {
                var updateStock = parseFloat(rows[0].stock_quantity) + parseFloat(response.quantity);

                // Query to update
                connection.query("UPDATE products SET ? WHERE ?", [{stock_quantity: updateStock}, {item_id: response.item}], function(err) {
                    if (err) throw err;
                    console.log(chalk.magenta("Stock updated successfully!"));
                    start(); 
                }


                
            )})

        })

        // start();
    }
}


function addNew() {
    inquirer.prompt ([
        {
            name: 'name',
            type: 'input',
            message: 'What is the name of the item you want to add?'

        },{
            name: 'price',
            type: 'input',
            message: 'What is the price for this item?'
        },{
            name: 'department',
            type: 'input',
            message: 'Which department does this item belong to?'
        }, {
            name: 'quantity',
            type: 'input',
            message:'How many items do you want to add?'
        }
    ]).then(function (response){


        connection.query('INSERT INTO products SET ?',
         {product_name: response.name, 
            department_name: response.department, 
                price: response.price, 
                    stock_quantity: response.quantity})  

                    console.log(chalk.magenta(response.name + " has been succesfully added!"));
     }) 

 
}
