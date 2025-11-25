import { useState, useEffect } from "react";
import { addNote } from "../../api/api";

export default function NotesForm({ refresh, editingNote, onUpdate }) {
  const [formData, setFormData] = useState({ title: "", content: "" });

  useEffect(() => {
    if (editingNote) {
      setFormData({ title: editingNote.title, content: editingNote.content });
    }
  }, [editingNote]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingNote) {
      await onUpdate(editingNote._id, formData);
    } else {
      await addNote(formData);
      refresh();
    }
    setFormData({ title: "", content: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} />
      <textarea name="content" placeholder="Content" value={formData.content} onChange={handleChange} />
      <button type="submit">{editingNote ? "Update" : "Add"}</button>
    </form>
  );
}
