create database BAMazonDB;

use BAMazonDB;

create table store(
item_id INT NOT NULL auto_increment,
product_name varchar(100) NOT NULL AUTO_INCREMENT,
department_name varchar(100) NOT NULL,
price INT(100) NOT NULL,
stock_quantity INT(100) NOT NULL,
PRIMARY KEY (item_id)

);

SELECT * From store;