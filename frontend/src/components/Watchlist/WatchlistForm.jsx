import React, { useState } from "react";
import { addWatchlistItem } from "../../api/api";

export default function WatchlistForm({ refresh }) {
  const [formData, setFormData] = useState({
    name: "",
    symbol: "",
    priceTarget: "",
    notes: ""
  });
  const [error, setError] = useState(""); // for showing validation errors

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend validation
    if (!formData.name || !formData.symbol) {
      setError("Name and Symbol are required.");
      return;
    }

    try {
      await addWatchlistItem(formData);
      setFormData({ name: "", symbol: "", priceTarget: "", notes: "" });
      setError("");
      refresh(); // refresh the list after adding
    } catch (err) {
      console.error("Error adding watchlist item:", err);
      setError("Failed to add item. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      <input
        name="symbol"
        value={formData.symbol}
        onChange={handleChange}
        placeholder="Symbol"
        required
      />
      <input
        name="priceTarget"
        value={formData.priceTarget}
        onChange={handleChange}
        placeholder="Price Target"
      />
      <input
        name="notes"
        value={formData.notes}
        onChange={handleChange}
        placeholder="Notes"
      />
      <button type="submit">Add</button>
    </form>
  );
}

