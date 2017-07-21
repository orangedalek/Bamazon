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