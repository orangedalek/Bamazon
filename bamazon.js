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
	connection.query("SELECT * FRON store", function(err, results){
		if (err) throw err;
	})


}

// allow customer to select item and quantity to buy
// if user tries to buy more than what's in stock, don't let them
// update store quantity



