import React, { useState } from "react";
import { addWatchlistItem } from "../../api/api";

export default function WatchlistForm({ refresh }) {
  const [formData, setFormData] = useState({ name: "", symbol: "", priceTarget: "", notes: "" });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addWatchlistItem(formData);
    setFormData({ name: "", symbol: "", priceTarget: "", notes: "" });
    refresh(); // refresh the list after adding
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
      <input name="symbol" value={formData.symbol} onChange={handleChange} placeholder="Symbol" />
      <input name="priceTarget" value={formData.priceTarget} onChange={handleChange} placeholder="Price Target" />
      <input name="notes" value={formData.notes} onChange={handleChange} placeholder="Notes" />
      <button type="submit">Add</button>
    </form>
  );
}
