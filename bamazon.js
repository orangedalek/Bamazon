// require npm packages
var consoleT = require("console.table");
var mysql = require("mysql");
var inquirer = require("inquirer");

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
	displayStore();
})

// use console.table to display store items to user

function displayStore(){
// get store info from mysql
	connection.query("SELECT * FROM store", function(err, results){
		if (err) throw err;
		// loop through items in store table and display them to console
		for (var i = 0; i < results.length; i++) {
			console.table([
			{
				item_id: results[i].item_id,
				product_name: results[i].product_name,
				department_name: results[i].department_name,
				price: results[i].price,
				stock_quantity: results[i].stock_quantity
			}



				])
		}
	})
	shop();


}

// allow customer to select item and quantity to buy
function shop(){
	
	inquirer.prompt([
		{
			name: "itemselect",
			type: "input",
			message: "Enter the item_id you would like to purchase.",
			validate: function(value) {
          		if (isNaN(value) === false) {
            		return true;
          		}else{
          			console.log("Please enter a number.");
          			return false;
        		}
		
			}
		},
		{
			name: "quantityselect",
			type: "input",
			message: "How many would you like to purchase?",
			validate: function(value) {
          		if (isNaN(value) === false) {
            		return true;
          		}else{
          			console.log("Please enter a number.");
          			return false;
        		}
			}
		}

		]).then(function(answer){
// get stock info from BAMazonDB
			var quantity = parseInt(answer.quantityselect);
			connection.query("SELECT * FROM store WHERE ?", [{item_id: answer.itemselect}], function(err, results){
				if (err) throw err;
				// if they try to order more than is in stock, don't let them
				if(results[0].stock_quantity < quantity){
					console.log("Sorry, we don't have that many! Try again.");
					shop();
				}else{
					// subtract items ordered from out inventory
					var newStock = results[0].stock_quantity - quantity;
					var orderTotal = results[0].price * quantity;
					connection.query("UPDATE store SET stock_quantity = ? WHERE item_id = ?", [newStock, answer.item_id], function(err, results){
						if (err) throw err;
						console.log("Order placed!");
						console.log("Your total is $ " + orderTotal);
						shop();

					});
				}
			});	
		});

}



			
