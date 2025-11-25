import React, { useEffect, useState } from "react";
import { getWatchlist, deleteWatchlistItem, updateWatchlistItem } from "../api/api";
import WatchlistForm from "../components/Watchlist/WatchlistForm";
import {
    getWatchlist,
    deleteWatchlisItem,
    updateWatchlistItem
} from "../.api/api";

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

  const handleEdit = async (item) => {

    try {
        const updated = { ...item, priceTarget: "NEW VALUE" }; // or open a modal/input
        await updateWatchlistItem(item._id, updated);
        loadData();
    } catch (err) {
        console.log(err);
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
            <button onClick={() => handleEdit(item)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
