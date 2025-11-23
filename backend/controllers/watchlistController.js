import Watchlist from "../models/watchListItemModel.js";

// return watchlist items
export const getWatchlist = async (req, res) => {
    try {
        //get data and return in json
        const items  = await Watchlist.find();
        res.json(items);
    } catch (err) {
        console.log(err)
    }
};

export const addToWatchlist = async (req, res) => {
    const { name, symbol, priceTarget, notes } = req.body;
    
    try {
        const newItem = await Watchlist.create({name, symbol, priceTarget, notes});
    } catch (err){

    }

};