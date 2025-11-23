import Note from "..models/noteModel.js"

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
        res.status(201).json(newNote)
    } catch {
        console.log(err);
    }
}