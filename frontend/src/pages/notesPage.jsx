import { useState, useEffect } from "react";
import NotesForm from "../components/Notes/NotesForm"; // your notes form
import TopCoinsDashboard from "../components/TopCoinsDashboard"; // dashboard component
import { getNotes, deleteNote, updateNote } from "../api/api"; // API functions

export default function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [editingData, setEditingData] = useState({ title: "", content: "" });

  // Load notes
  const loadNotes = async () => {
    try {
      const data = await getNotes();
      setNotes(data);
    } catch (err) {
      console.error("Error loading notes:", err);
    }
  };

  // Delete note
  const handleDelete = async (id) => {
    try {
      await deleteNote(id);
      loadNotes();
    } catch (err) {
      console.error("Error deleting note:", err);
    }
  };

  // Start editing a note
  const handleEdit = (note) => {
    setEditingNoteId(note._id);
    setEditingData({
      title: note.title,
      content: note.content,
    });
  };

  // Save edited note
  const handleSave = async () => {
    try {
      await updateNote(editingNoteId, editingData);
      setEditingNoteId(null);
      loadNotes();
    } catch (err) {
      console.error("Error updating note:", err);
    }
  };

  useEffect(() => {
    loadNotes();
  }, []);

  return (
    <div className="container">
      <h1>Notes</h1>

      {/* Notes Form */}
      <NotesForm refresh={loadNotes} />

      {/* Notes List */}
      <div className="cards-container">
        {notes.map((note) => (
          <div className="card" key={note._id}>
            {editingNoteId === note._id ? (
              <>
                <input
                  value={editingData.title}
                  onChange={(e) => setEditingData({ ...editingData, title: e.target.value })}
                  placeholder="Title"
                />
                <textarea
                  value={editingData.content}
                  onChange={(e) => setEditingData({ ...editingData, content: e.target.value })}
                  placeholder="Content"
                />
                <button onClick={handleSave}>Save</button>
                <button onClick={() => setEditingNoteId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <h3>{note.title}</h3>
                <p>{note.content}</p>
                <button onClick={() => handleEdit(note)}>Edit</button>
                <button onClick={() => handleDelete(note._id)}>Delete</button>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Top 50 Coins Dashboard */}
      <h2 style={{ textAlign: "center", marginTop: "40px" }}>
        Top 50 Coin Data and Analytics
      </h2>
      <TopCoinsDashboard showImages={true} />
    </div>
  );
}

