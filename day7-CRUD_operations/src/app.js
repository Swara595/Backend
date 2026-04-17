const express = require("express")

const app = express()
app.use(express.json())
const noteModel = require("./models/notes.model")

//POST API
app.post("/notes", async (req, res) => {
    const { title, description, age } = req.body //ye code client se data lega, client se data aayega req.body me, usme title and description hoga, to hum usko destructure krke title and description variable me store kr lenge
    const note = await noteModel.create({ //ye code database me ek new note create karega and data mumbai vale cluster pe store karega
        title, description, age
    })
    //await-async kyu ? pune se data mumbai tak jayega thru internet vaha pe jaake store hoga and hume response milega, lekin isme kitna time lagega pata nhi kyuki internet ki spped ke upar depend karega, isiliye async await
    res.status(201).json({
        message: "Note created successfully",
        note
    })
})

//GET API
app.get("/notes", async (req, res) => {
    const notes = await noteModel.find()
    res.status(200).json({
        message: "Notes fetched successfully",
        notes
    })
})

module.exports = app