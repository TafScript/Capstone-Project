import { Routes, Route, NavLink } from "react-router-dom";
import WatchlistPage from "./pages/WatchlistPage";
import NotesPage from "./pages/NotesPage"; // Make sure the file name matches the folder
import HomePage from "./pages/HomePage";
import "./App.css";

function App() {
  return (
    <>
      <nav className="navbar">
        <NavLink to="/" className="nav-item">Home</NavLink>
        <NavLink to="/watchlist" className="nav-item">Watchlist</NavLink>
        <NavLink to="/notes" className="nav-item">Notes</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/watchlist" element={<WatchlistPage />} />
        <Route path="/notes" element={<NotesPage />} />
      </Routes>
    </>
  );
}

export default App;


