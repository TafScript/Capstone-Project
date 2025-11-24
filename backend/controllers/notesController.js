import Note from "../models/noteModel.js"

//Get data for user notes
export const getNotes = async (req, res) => { 
    try{
        // get data from database
        const notes = await Note.find()
        // return in json format
        res.json(notes);
    } catch (err) {
        console.log(err);
    }

};

// post new note
export const createNote = async (req, res) => {
    try {
        //destructing data format
        const {title, content} = req.body;
        //create new note data from req.body format
        const newNote = await Note.create({ title, content });
        // return new note
        res.json(newNote)
    } catch {
        console.log(err);
    }
}

// Update a note
export const updateNote = async (req, res) => {
  try {
    const noteId = req.params.id;
    const updatedData = req.body;

    const updatedNote = await Note.findByIdAndUpdate(noteId, updatedData, { new: true });
    if (!updatedNote) {console.log("No note(s) found.")};

    res.json(updatedNote);
  } catch (error) {
    console.log(error);
  }
};

// Delete a note
export const deleteNote = async (req, res) => {
  try {
    const noteId = req.params.id;
    const deletedNote = await Note.findByIdAndDelete(noteId);
    if (!deletedNote) {console.log("No note found.")};

    res.json({ message: "Note deleted" });
  } catch (error) {
    console.log(error);
  }
};