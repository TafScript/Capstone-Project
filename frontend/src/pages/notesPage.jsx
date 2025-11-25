import { useState, useEffect } from "react";
import NotesForm from "../components/Notes/NotesForm"; // your notes form
import TopCoinsDashboard from "../components/TopCoinsDashboard"; // dashboard component
import { getNotes, deleteNote } from "../api/api"; // your API functions

export default function NotesPage() {
  const [notes, setNotes] = useState([]);

  const loadNotes = async () => {
    try {
      const data = await getNotes();
      setNotes(data);
    } catch (err) {
      console.error("Error loading notes:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteNote(id);
      loadNotes();
    } catch (err) {
      console.error("Error deleting note:", err);
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
        {notes.length === 0 ? (
          <p>No notes yet.</p>
        ) : (
          notes.map((note) => (
            <div className="card" key={note._id}>
              <h3>{note.title}</h3>
              <p>{note.content}</p>
              <button onClick={() => handleDelete(note._id)}>Delete</button>
            </div>
          ))
        )}
      </div>

      {/* Top 50 Coins Dashboard */}
      <h2 className="section-title" style={{ textAlign: "center", marginTop: "40px" }}>
        Top 50 Coin Data and Analytics
      </h2>

      {/* Ensure TopCoinsDashboard handles images internally */}
      <TopCoinsDashboard />
    </div>
  );
}

