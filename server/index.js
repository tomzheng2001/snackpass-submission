import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';

import { itemRoutes } from "./routes/items.js";
import { restaurantRoutes } from "./routes/restaurants.js";

const app = express();
dotenv.config({ path: "./.env" });
const port = process.env.PORT || 3001;

app.use(cors());
app.use(itemRoutes);
app.use(restaurantRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
