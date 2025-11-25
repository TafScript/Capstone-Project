import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import WatchlistPage from "./pages/WatchlistPage";
import NotesPage from "./pages/notesPage";

export default function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Watchlist</Link>
        <Link to="/notes">Notes</Link>
      </nav>

      <Routes>
        <Route path="/" element={<WatchlistPage />} />
        <Route path="/notes" element={<NotesPage />} />
      </Routes>
    </Router>
  );
}

