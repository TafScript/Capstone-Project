import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    res.send("notes route working");
});

export default router;