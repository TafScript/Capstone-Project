import React, { useEffect, useState } from "react";
import { getWatchlist, deleteWatchlistItem } from "../../api/api";



//ADD TRY CATCH TO THESE LATER

export default function WatchlistList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchWatchlist();
  }, []);

  const fetchWatchlist = async () => {
    const data = await getWatchlist();
    setItems(data);
  };

  const handleDelete = async (id) => {
    await deleteWatchlistItem(id);
    fetchWatchlist();
  };

  return (
    <div>
      <h1>Watchlist</h1>

      <WatchlistForm refresh={loadData} />

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

      <h2>Top 50 Coins Dashboard</h2>
      <TopCoinsDashboard />
    </div>
  );
}
