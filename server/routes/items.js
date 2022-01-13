import express from "express";

import { listTrendingItems, getRecentPurchased, itemById, addItem } from '../controllers/items.js';

const router = express.Router();
router.get("/items/list", listTrendingItems);
router.get("/items/recent/:itemId", getRecentPurchased);
router.post("/items/addItem/", addItem);

router.param("itemId", itemById);

export {router as itemRoutes};