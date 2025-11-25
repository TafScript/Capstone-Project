import { useState, useEffect } from "react";
import { getWatchlist, deleteWatchlistItem, updateWatchlistItem } from "../api/api"; 
import WatchlistForm from "../components/Watchlist/WatchlistForm";
import TopCoinsDashboard from "../components/TopCoinsDashboard";

export default function WatchlistPage() {
  const [items, setItems] = useState([]);
  const [watchlistPrices, setWatchlistPrices] = useState({});
  const [editingItemId, setEditingItemId] = useState(null);
  const [editingData, setEditingData] = useState({ name: "", symbol: "", priceTarget: "", notes: "" });

  // Load watchlist from backend
  const loadWatchlist = async () => {
    try {
      const data = await getWatchlist();
      setItems(data);
    } catch (err) {
      console.error("Error loading watchlist:", err);
    }
  };

  // Fetch live prices from CoinGecko
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
    }
  };

  // Delete a watchlist item
  const handleDelete = async (id) => {
    try {
      await deleteWatchlistItem(id);
      loadWatchlist();
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };

  // Start editing
  const handleEdit = (item) => {
    setEditingItemId(item._id);
    setEditingData({
      name: item.name,
      symbol: item.symbol,
      priceTarget: item.priceTarget,
      notes: item.notes,
    });
  };

  // Save edit
  const handleSave = async () => {
    try {
      await updateWatchlistItem(editingItemId, editingData);
      setEditingItemId(null);
      loadWatchlist();
    } catch (err) {
      console.error("Error updating item:", err);
    }
  };

  useEffect(() => {
    loadWatchlist();
  }, []);

  useEffect(() => {
    loadWatchlistPrices();
  }, [items]);

  return (
    <div className="container">
      <h1>Watchlist</h1>

      {/* Add-to-watchlist form */}
      <WatchlistForm refresh={loadWatchlist} />

      {/* Watchlist items */}
      <div className="cards-grid">
        {items.map((item) => {
          const priceInfo = watchlistPrices[item.symbol.toLowerCase()];

          return (
            <div className="card" key={item._id}>
              {editingItemId === item._id ? (
                <>
                  <input
                    value={editingData.name}
                    onChange={(e) => setEditingData({ ...editingData, name: e.target.value })}
                    placeholder="Name"
                  />
                  <input
                    value={editingData.symbol}
                    onChange={(e) => setEditingData({ ...editingData, symbol: e.target.value })}
                    placeholder="Symbol"
                  />
                  <input
                    value={editingData.priceTarget}
                    onChange={(e) => setEditingData({ ...editingData, priceTarget: e.target.value })}
                    placeholder="Price Target"
                  />
                  <input
                    value={editingData.notes}
                    onChange={(e) => setEditingData({ ...editingData, notes: e.target.value })}
                    placeholder="Notes"
                  />
                  <button onClick={handleSave}>Save</button>
                  <button onClick={() => setEditingItemId(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <h3>{item.name} ({item.symbol.toUpperCase()})</h3>
                  <p><strong>Target:</strong> ${item.priceTarget}</p>
                  <p>
                    <strong>Current:</strong>{" "}
                    {priceInfo
                      ? `$${priceInfo.usd.toLocaleString()} (${priceInfo.usd_24h_change?.toFixed(2)}%)`
                      : "Loading..."}
                  </p>
                  <p>{item.notes}</p>
                  <button onClick={() => handleEdit(item)}>Edit</button>
                  <button onClick={() => handleDelete(item._id)}>Delete</button>
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Top 50 Coins Dashboard */}
      <h2 style={{ textAlign: "center", marginTop: "40px" }}>
        Top 50 Coin Data and Analytics
      </h2>
      <TopCoinsDashboard showImages={true} />
    </div>
  );
}
