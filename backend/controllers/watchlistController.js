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
        res.json(newItem);
    } catch (err){
        console.log(err);
    }

};


export const updateWatchlist = async (req, res) => {
    const { id } = req.params;
    const { name, symbol, priceTarget, notes} = req.body;

    try{
        const updatedItem = await Watchlist.findByIdAndUpdate(id, { name, symbol, priceTarget, notes})

        if (!updatedItem) {
            console.log("Item(s) not found.")
        }

        res.json(updatedItem);
    } catch (err) {
        console.log(err);
    }
}

export const deleteFromlist = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedItem = await Watchlist.findByIdAndDelete(id);

        if (!deletedItem) {
            console.log("Item not found.");
        }

        res.json("Item removed from watchlist.")
    } catch (err) {
        console.log(err)
    }
}