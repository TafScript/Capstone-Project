import React, { useEffect, useState } from "react";
import { getWatchlist, deleteWatchlistItem } from "../api/api";
import WatchlistForm from "../components/Watchlist/WatchlistForm";

export default function WatchlistPage() {
  const [items, setItems] = useState([]);

  const loadData = async () => {
    try {
      const data = await getWatchlist();
      setItems(data);
    } catch (error) {
      console.error("Error fetching watchlist:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteWatchlistItem(id);
      loadData();
    } catch (err) {
      console.error("Error deleting:", err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <h1>Watchlist</h1>

      {/* Add New Item Form */}
      <WatchlistForm refresh={loadData} />

      {/* Display Items */}
      <ul>
        {items.map((item) => (
          <li key={item._id}>
            <strong>{item.name}</strong> ({item.symbol}) – Target: {item.priceTarget}
            <br />
            Notes: {item.notes}
            <br />
            <button onClick={() => handleDelete(item._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
