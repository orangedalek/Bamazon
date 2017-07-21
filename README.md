# Bamazon
Homework for UCB Coding Bootcamp week 7, part 2

This app uses inquirer, console.table and mySQL to create a "store" where customers can "buy" items and managers can manage stock.

###bamazon.js - Customer mode

Users choose an item and quantity to purchase, and the app removes the purchased quantity from the database and calculates total cost for the user. The items in our store are all Elliott Smith themed because that's what I was listening to when I made the initial database :wink:

###bamazon_manager.js - manager mode

The manager function allows the user to see a table of total store stock, see a table of only items with fewer than 5 units left in stock, add to the inventory of current items, or add entirely new items to the store.


