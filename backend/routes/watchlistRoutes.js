import express from "express";


const router = express.Router();

// route to Watchlist url
router.get("/", (req, res) => {
    res.send("Watchlist route working");
})

export default router;