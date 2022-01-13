import formidable from 'formidable';
import path from 'path/win32';
import mySQLConnection from '../connection.js';
import * as fs from 'fs';


const listTrendingItems = (_, res) => {
    mySQLConnection.query(
        `SELECT * FROM items 
        WHERE last_purchased >= now() - INTERVAL 2 DAY
        ORDER BY (SELECT COUNT(*) AS recent FROM items
        WHERE last_purchased >= now() - INTERVAL 1 DAY), last_purchased DESC`,
        // Order by most purchased in last 24 ours, and break ties by last purchase date
        (err, results) => {
            if (err) {
                return res.status(400).json({
                    error: "Failed to list trending items",
                });
            }
            res.json(results);
        }
    );
};

const getRecentPurchased = (req, res) => {
    mySQLConnection.query(
        `SELECT sum(b.quantity) AS quantity FROM orders as a, orderItems as b
		WHERE a.order_id = b.order_id and b.item_id = 1 AND
        a.created >= NOW() - INTERVAL 2 DAY;`,
            [req.item.item_id],
        (err, results) => {
            if (err) {
                return res.status(400).json({
                    error: "Failed to list trending items",
                });
            }
            res.json(results);
        }
    );
}

const addItem = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "There was an Error creating item",
            });
        }
        const { name, price, restaurantId } = fields;

        if (files.food_image) {
            var old = files.food_image.filepath;
            const __dirname = path.resolve(path.dirname(''));
            var newPath = path.join(__dirname, "/../..", "snackpass/client/public/images") + "/" + files.food_image.originalFilename;
            console.log(newPath);
            var imgData = fs.readFileSync(old);
            fs.writeFile(newPath, imgData, function (err) {
                if (err) {
                    console.log(err.message);
                } else {
                    console.log("Successful Upload");
                }
                
            });
        } else {
            return res.status(400).json({
                error: "Image required",
            });

         }

         mySQLConnection.query(
             `INSERT INTO items SET ?`,
             {
                name: name,
                price: price,
                photo: files.food_image.originalFilename,
                restaurant_id: restaurantId,
                last_purchased: new Date().toISOString().slice(0, 19).replace('T', ' '),
             }, 
             (err, results) => {
                if (err) {
                    console.log(err.message);
                    return res.status(400).json({
                        error: err.message,
                    });
                }
                res.json(results);
            } 
         )
    })
}

const itemById = (req, res, next, id) => {
    mySQLConnection.query(
        `SELECT * FROM items WHERE item_id = ${id}`,
        (err, results) => {
            if (err) {
                return res.status(400).json({
                    message: "Something went wrong fetching item by ID",
                });
            } else if (results.length === 0) {
                return res.status(400).json({
                    message: "User not found",
                });
            }
            const item = results[0];
            console.log(item);
            req.item = item;
            next();
        }
    );
};



export {listTrendingItems, getRecentPurchased, itemById, addItem};