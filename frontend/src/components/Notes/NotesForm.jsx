import React, { useState } from "react";
import { addNote } from "../../api/api";

export default function NotesForm({ refresh }) {
  const [formData, setFormData] = useState({ title: "", content: "" });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addNote(formData);
    setFormData({ title: "", content: "" });
    refresh();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" />
      <textarea name="content" value={formData.content} onChange={handleChange} placeholder="Content" />
      <button type="submit">Add Note</button>
    </form>
  );
}
