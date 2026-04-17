/* jo function connectToDb() hai jiske code ki vajah se code database se connect hota hai
vo code server.js file me nhi likhte hai kyuki aage jaake server.js file me aur bhi jyada code ayega, to 
src me ek folder bano config naam ka , config folder ke andar file banao 
database.js usme vo code likho*/

const mongoose = require("mongoose")

function connectToDB() {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log("Connected to DB")
        })
}

module.exports = connectToDB