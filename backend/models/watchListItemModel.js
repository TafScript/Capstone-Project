import mongoose from "mongoose";

const watchlistSchema = mongoose.Shchema(
    {
        name: {
            type: String,
            required: true,
        },
        symbol: {
            type: String,
            required: true,
        },
        priceTarget: {
            type: Number,
        },
        notes: {
            type: String,
        },
    }
)

export default mongoose.model("Watchlist", watchlistSchema);