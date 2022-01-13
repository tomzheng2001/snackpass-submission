import mySQLConnection from '../connection.js';

export const getRestaurant = (req, res) => {
    mySQLConnection.query(
        `SELECT * FROM restaurants WHERE id = ?`, [req.params.restaurantId],
        (err, results) => {
            if (err) {
                return res.status(400).json({
                    message: "Something went wrong fetching restaurant by ID",
                });
            } else if (results.length === 0) {
                return res.status(400).json({
                    message: "Restaurant not found",
                });
            }
            res.json(results[0]);
        }
    );
};

export const listRestaurants = (_, res) => {
    mySQLConnection.query(
        `SELECT * FROM restaurants`,
        (err, results) => {
            if (err) {
                return res.status(400).json({
                    message: "Something went wrong fetching restaurants",
                });
            } else if (results.length === 0) {
                return res.status(400).json({
                    message: "Restaurants not found",
                });
            } else {
                res.json(results);
            }
            
        }
    );
}

