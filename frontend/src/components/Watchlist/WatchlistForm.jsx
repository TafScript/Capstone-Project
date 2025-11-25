import { useState, useEffect } from "react";
import { addWatchlistItem } from "../../api/api";

export default function WatchlistForm({ refresh, editingItem, onUpdate }) {
  const [formData, setFormData] = useState({
    name: "",
    symbol: "",
    priceTarget: "",
    notes: "",
  });

  useEffect(() => {
    if (editingItem) {
      setFormData({
        name: editingItem.name,
        symbol: editingItem.symbol,
        priceTarget: editingItem.priceTarget,
        notes: editingItem.notes,
      });
    }
  }, [editingItem]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingItem) {
      await onUpdate(editingItem._id, formData);
    } else {
      await addWatchlistItem(formData);
      refresh();
    }
    setFormData({ name: "", symbol: "", priceTarget: "", notes: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
      <input name="symbol" value={formData.symbol} onChange={handleChange} placeholder="Symbol" />
      <input name="priceTarget" value={formData.priceTarget} onChange={handleChange} placeholder="Price Target" />
      <input name="notes" value={formData.notes} onChange={handleChange} placeholder="Notes" />
      <button type="submit">{editingItem ? "Update" : "Add"}</button>
    </form>
  );
}

