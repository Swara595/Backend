const mongoose = require("mongoose")

const noteSchema = new mongoose.Schema({
    title: String,
    description: String
})

//creating a model
const noteModel = mongoose.model("notes", noteSchema)

module.exports = noteModel //bcoz is model ke bina hum koi bhi operation(like CRUD) perform nhi kr skte