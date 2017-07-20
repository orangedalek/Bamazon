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


}