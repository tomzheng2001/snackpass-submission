import mysql from 'mysql2';
import dotenv from 'dotenv'
dotenv.config({ path: "./.env" });

var mySQLConnection = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    multipleStatements: true,
});

mySQLConnection.connect((err) => {
    if (!err) {
        console.log("Connected");
    } else {
        throw err;
    }
});

mySQLConnection.query(
    `
    USE snackpass;
    CREATE TABLE IF NOT EXISTS restaurants (
        id int auto_increment,
        name varchar(50),
        PRIMARY KEY (id)
    );
    CREATE TABLE IF NOT EXISTS items (
        item_id int auto_increment,
        name varchar(50),
        photo varchar(100),
        price decimal(5,2),
        restaurant_id int,
        last_purchased datetime,
        PRIMARY KEY (item_id),
        FOREIGN KEY (restaurant_id) REFERENCES restaurants(id)
    );
    CREATE TABLE IF NOT EXISTS orders (
        order_id int auto_increment,
        created datetime,
        PRIMARY KEY (order_id)
    );
    CREATE TABLE IF NOT EXISTS orderItems (
        order_id int,
        item_id int,
        quantity int,
        FOREIGN KEY (order_id) REFERENCES orders(order_id),
        FOREIGN KEY (item_id) REFERENCES items(item_id)
    );
    `,(err, results) => {
        if (err) {
            console.log(err);
        }
        console.log(results);
    }
);

export default mySQLConnection;

