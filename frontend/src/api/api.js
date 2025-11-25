const BASE_URL = "http://localhost:3000/api";


//get watchlist data
export const getWatchlist = async () => {
  try {
    const res = await fetch(`${BASE_URL}/watchlist`);
    if (!res.ok) throw new Error("Failed to fetch watchlist");
    return await res.json();
  } catch (err) {
    console.log("Error in getWatchlist:", err);
  }
};

//add notes
export const addWatchlistItem = async (item) => {
  try {
    const res = await fetch(`${BASE_URL}/watchlist`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });
    if (!res.ok) {console.log("Failed to add watchlist items")}
    return res.json();
  } catch (err) {
    console.log("Error in addWatchlistItem: ", err);
  }
};

//update notes
export const updateWatchlistItem = async (id, data) => {
  try {
    const res = await fetch(`${BASE_URL}/watchlist/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {"Couldn't update watchlist item."};
    return res.json();
  } catch (err) {
    console.log("Error in updateWatchlistItem:", err);
    throw err;
  }
};


//delete notes
export const deleteWatchlistItem = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/watchlist/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) {console.log("Failed to delete watchlist item.")};
    return true;
  } catch (err) {
    console.log("Error in deleteWatchlistItem:", err);
    throw err;
  }
};


//get notes.

export const getNotes = async () => {
  try {
    const res = await fetch(`${BASE_URL}/notes`);
    if (!res.ok) {"failed to fetch notes"};
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

export const addNote = async (note) => {
    try {
        const res = await fetch(`${BASE_URL}/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(note),
        });
        if (!res.ok){console.log("Failed to add note.")};
        return res.json();
    } catch (err) {
        console.log(err);
  }
}

export const updateNote = async (id, data) => {
  try {
    const res = await fetch(`${BASE_URL}/notes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {console.log("Failed to update note.")}
    return res.json();
  } catch (err) {
    console.err(err);
  }
};

export const deleteNote = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/notes/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) {console.log("Failed to delete note.")}
    console.log("Succesfully deleted note.");
  } catch (err) {
    console.log(err);
    
  }
};



