import { useState, useEffect } from "react";

export default function TopCoinsDashboard() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTopCoins = async () => {
    try {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false"
      );
      const data = await res.json();
      setCoins(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching top coins:", err);
    }
  };

  useEffect(() => {
    fetchTopCoins();

    //refresh every 60 seconds, still buggy fix later
    const interval = setInterval(fetchTopCoins, 60000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <p>Loading top 50 coins...</p>;

  return (
    <div style={{ maxHeight: "500px", overflowY: "scroll" }}>
      {coins.map((coin) => (
        <div key={coin.id} className="coin-card">
          <h4>
            {coin.market_cap_rank}. {coin.name} ({coin.symbol.toUpperCase()})
          </h4>
          <p>Price: ${coin.current_price.toLocaleString()}</p>
          <p>Market Cap: ${coin.market_cap.toLocaleString()}</p>
          <p>24h Change: {coin.price_change_percentage_24h.toFixed(2)}%</p>
        </div>
      ))}
    </div>
  );
}
