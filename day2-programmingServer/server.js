const express = require("express")
const app = express()
// server create ho chuka hai

app.get('/', (req, res) => {
    res.send("Hello world!! Server is now working")
})

app.get('/about', (req, res) => {
    res.send("This is the about page")
})

app.get('/contact', (req, res) => {
    res.send("This is the contact page")
})

app.get('/dhurandhar', (req, res) => {
    res.send("Ghar ki yaad nhi aayi tuje jassi!!!")
})

app.listen(3000)
// server start ho chuka hai