import express from "express";
import {
    getWatchlist,
    addToWatchlist,
    updateWatchlist,
    deleteFromWatchlist, } from "../controllers/watchlistController.js";

const router = express.Router();

// route to Watchlist url
router.get("/", getWatchlist);
router.post("/", addToWatchlist);
router.put("/:id", updateWatchlist);
router.delete("/:id", deleteFromWatchlist);

export default router;