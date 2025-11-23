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