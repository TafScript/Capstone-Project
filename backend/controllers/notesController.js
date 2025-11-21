import Note from "..models/noteModel.js"

//Get data for user notes
export const getNotes = async (req, res) => {
    // get data from database
    const notes = await Note.find()
    // return in json format
    res.json(notes);
};

// post new note
export const createNote = async (req, res) => {

    //destructing data format
    const {title, content} = req.body;
    //create new note data from req.body format
    const newNote = await Note.create({ title, content });

    // return new note
    res.status(201).json(newNote)
}