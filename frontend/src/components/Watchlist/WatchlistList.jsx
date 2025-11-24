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
      <h2>Watchlist</h2>
      <ul>
        {items.map((item) => (
          <li key={item._id}>
            {item.name} ({item.symbol}) - Target: {item.priceTarget}
            <button onClick={() => handleDelete(item._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
