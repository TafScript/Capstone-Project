import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import WatchlistPage from "./pages/WatchlistPage";

export default function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Watchlist</Link>
      </nav>

      <Routes>
        <Route path="/" element={<WatchlistPage />} />
      </Routes>
    </Router>
  );
}

