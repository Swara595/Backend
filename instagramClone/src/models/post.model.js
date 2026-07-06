const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    caption: {
        type: String,
        default: ""
    },
    imgUrl: {
        type: String,
        required: [true, "Image url is required to create a post"]
    },
    user: {
        ref: "users", /**name of collection in which user id is stored */
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "user id is required to create a post "]
    }
})

const postModel = mongoose.model("posts", postSchema)

module.exports = postModel 