const express = require("express")
// const connectToDB = require("./src/config/database")
const authRouter = require("./routes/auth.routes") /**to use the api */
const cookieParser = require("cookie-parser")


const app = express()

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRouter) /** /api/auth is just a prefix */




module.exports = app