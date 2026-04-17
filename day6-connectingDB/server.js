/*
-server ko start krna 
-express ka server database se connect krna
*/

const app = require('./src/app');
const mongoose = require('mongoose');

function connectToDB() {
    mongoose.connect("mongodb+srv://swara:QarLiHqwcBR4A9jn@cluster0.1rddszz.mongodb.net/day-6")
        .then(() => {
            console.log("Connected to database")
        })
}

connectToDB();

app.listen(3000, () => {
    console.log("server is running on port 3000");
})