// require npm packages
var consoleT = require("console.table");
var mysql = require("mysql");
var inquirer = require("inquirer");
var userCommand = [];

// connect to mysql

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "F4rtP4rty",
	database: "BAMazonDB"
});

connection.connect(function(err){
	if(err)throw(err);
	console.log("connected as id " + connection.threadID);
	menu();
})

function menu(){
	inquirer.prompt({
		name: "options",
		type:"rawlist",
		message: "Welcome, manager! What would you like to do?",
		choices: ["View store inventory", "View items with low inventory", "Add to inventory", "Add new items to the store"]
	}).then(function(answer){

		command = answer.options;

		userCommand.push(command);

		getCommand();

	})
	}

function getCommand(){

			switch(command){
			case "View store inventory":
				displayStore();
				break;

			case "View items with low inventory":
				viewLow();
				break;

			case "Add to inventory":
				addInv();
				break;

			case "Add new items to the store":
				addItems();
				break;
		}
	}


// use console.table to display store items to user

function displayStore(){
// get store info from mysql
	connection.query("SELECT * FROM store", function(err, results){
		if (err) throw err;
		items = [];
		// loop through items in store table and push them to items array for easier formatting
		for (var i = 0; i < results.length; i++) {


			var store_item ={

				item_id: results[i].item_id,
				product_name: results[i].product_name,
				department_name: results[i].department_name,
				price: results[i].price,
				stock_quantity: results[i].stock_quantity
			}

		items.push(store_item);


				
		}
		// display formatted table after line break
		console.table(["\n"], items);
		menu();
	})
}


// function to view items with low inventory
function viewLow(){
	connection.query("SELECT * FROM store", function(err, results){
		if (err) throw err;
		lowItems = [];
		for (var i = 0; i < results.length; i++) {
		 if(results[i].stock_quantity < 5){

		 		var lowItem ={

				item_id: results[i].item_id,
				product_name: results[i].product_name,
				department_name: results[i].department_name,
				price: results[i].price,
				stock_quantity: results[i].stock_quantity
			}

		lowItems.push(lowItem);

		 }
		 console.table(["\n"], lowItems);
		 menu();
		}
	})
}

function addInv(){


	inquirer.prompt([
		{
			name: "addItem",
			type: "input",
			message: "Enter the item id to add stock.",
			validate: function(value){
				if(isNaN(value) == false){
					return true;
				}else{
					return false;
					}
			}
		},
		{
			name: "addQuantity",
			type: "input",
			message: "How many would you like to add?",
			validate: function(value){
				if(isNaN(value) == false){
					return true;
				}else{
					return false;
					}
			}
		}
		
		]).then(function(answer){
			// get old values
			var currentStock;

			connection.query("SELECT * FROM store WHERE item_id = ?", answer.addItem, function(err, results){
				if (err) throw err;
				if(results.length > 0){
					currentStock = parseInt(results[0].stock_quantity);
					console.log("Current Stock " + currentStock);
				}

			connection.query("UPDATE store SET stock_quantity = ? WHERE item_id = ?", [currentStock + parseInt(answer.addQuantity), answer.addItem], function(err, results){
				if (err) throw err;
				console.log("Stock updated!");
			} )
			displayStore();
			});
		})
	
}
























