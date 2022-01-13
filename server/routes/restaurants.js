import express from "express";

import { getRestaurant, listRestaurants } from "../controllers/restaurants.js";

const router = express.Router();
router.get("/restaurants/:restaurantId", getRestaurant);
router.get("/listrestaurants/", listRestaurants);

export {router as restaurantRoutes};