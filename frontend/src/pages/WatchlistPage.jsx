import { useState, useEffect } from "react";
import { getWatchlist, deleteWatchlistItem } from "../api/api";
import WatchlistForm from "../components/Watchlist/WatchlistForm";

export default function WatchlistPage() {
  const [items, setItems] = useState([]);
  const [watchlistPrices, setWatchlistPrices] = useState({});
  const [topCoins, setTopCoins] = useState([]);
  const [loadingTop, setLoadingTop] = useState(true);
  const [error, setError] = useState(null);

  // Load watchlist from backend
  const loadWatchlist = async () => {
    try {
      const data = await getWatchlist();
      setItems(data);
    } catch (err) {
      console.error("Error loading watchlist:", err);
      setError("Failed to load watchlist.");
    }
  };

  // Delete an item
  const handleDelete = async (id) => {
    try {
      await deleteWatchlistItem(id);
      loadWatchlist();
    } catch (err) {
      console.error("Error deleting item:", err);
      setError("Failed to delete item.");
    }
  };

  // Fetch live prices for watchlist
  const loadWatchlistPrices = async () => {
    if (items.length === 0) return;

    const ids = items.map((i) => i.symbol.toLowerCase()).join(",");
    try {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`
      );
      const data = await res.json();
      setWatchlistPrices(data);
    } catch (err) {
      console.error("Error fetching watchlist prices:", err);
      setError("Failed to fetch watchlist prices.");
    }
  };

  // Fetch top 50 coins
  const loadTop50 = async () => {
    try {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false"
      );
      const data = await res.json();
      setTopCoins(data);
    } catch (err) {
      console.error("Error fetching top coins:", err);
      setError("Failed to fetch top coins.");
    } finally {
      setLoadingTop(false);
    }
  };

  // Load watchlist and top coins on mount
  useEffect(() => {
    loadWatchlist();
    loadTop50();
  }, []);

  // Update watchlist prices whenever items change
  useEffect(() => {
    loadWatchlistPrices();

    // Auto-refresh every 30 seconds
    const interval = setInterval(() => {
      loadWatchlistPrices();
    }, 30000);

    return () => clearInterval(interval);
  }, [items]);

  return (
    <div className="dashboard-container">
      <h1 style={{ textAlign: "center" }}>Crypto Dashboard</h1>

      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      {/* Watchlist Section */}
      <div className="dashboard-section">
        <h2>Your Watchlist</h2>
        <WatchlistForm refresh={loadWatchlist} />
        <div className="cards-grid">
          {items.length === 0 && <p>No items in your watchlist yet.</p>}
          {items.map(item => {
            const priceInfo = watchlistPrices[item.symbol.toLowerCase()];
            return (
              <div className="card" key={item._id}>
                <h3>{item.name} ({item.symbol.toUpperCase()})</h3>
                <p><strong>Target:</strong> ${Number(item.priceTarget).toLocaleString()}</p>
                <p>
                  <strong>Current:</strong>{" "}
                  {priceInfo
                    ? `$${priceInfo.usd.toLocaleString()} (${priceInfo.usd_24h_change?.toFixed(2)}%)`
                    : "Loading..."}
                </p>
                <p>{item.notes}</p>
                <button onClick={() => handleDelete(item._id)}>Delete</button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Top 50 Coins Section */}
      <div className="dashboard-section">
        <h2 style={{ textAlign: "center" }}>Top 50 Coin Data & Analytics</h2>
        {loadingTop ? (
          <p style={{ textAlign: "center" }}>Loading top coins...</p>
        ) : (
          <div className="cards-grid scrollable">
            {topCoins.map(coin => (
              <div className="card" key={coin.id}>
                <div className="coin-header">
                  <img src={coin.image} alt={coin.name} className="coin-logo" />
                  <h3>{coin.name} ({coin.symbol.toUpperCase()})</h3>
                </div>
                <p><strong>Price:</strong> ${coin.current_price.toLocaleString()}</p>
                <p>
                  <strong>24h Change:</strong>{" "}
                  <span style={{ color: coin.price_change_percentage_24h >= 0 ? "lime" : "red" }}>
                    {coin.price_change_percentage_24h.toFixed(2)}%
                  </span>
                </p>
                <p><strong>Market Cap:</strong> ${coin.market_cap.toLocaleString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

