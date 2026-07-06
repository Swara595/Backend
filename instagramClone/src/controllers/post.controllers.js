const postModel = require("../models/post.model")
const ImageKit = require("@imagekit/nodejs")
const { toFile } = require("@imagekit/nodejs")
const jwt = require("jsonwebtoken")

//initiate image kit 
const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

async function createPostController(req, res) {
    /** req.body me hume data send krna hai - caption aur image file. jab bhi hume file send krni hoti hai, tab hum raw data format nhi use kr skte hai. Hume vaha pe form-data format ka use krna padta hai  */

    /** jab bhi hum raw data format me koi bhi file bhejte hai, express ka server use read nhi kr pata - iska solution hai "multer" package. install kro and use kro */

    /** multer has 2 types of storages - disk storage(files are stored on hard disk/servver) and memory storage(files are stored in RAM) */

    /**here we are going to use memory storage because we dont store files on server */

    /** bandwidth = server kitna data transfer kr skta hai , bandwidth ke hisab se hume paise pay krne padte hai . server ki bandwidth ki pricing bohot jyada hoti hai , hence we use "cloud storage providers". pricing of cloud storage providers is comparatively less. therefore , we do not store our files on server, we store it on cloud storage . some of the cloud storage providers are : S3(by AWS), imagekit, cloudinary,etc*/

    console.log("BODY:", req.body)
    console.log("FILE:", req.file) /**we can see the caption and image on our server */

    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({
            message: "Token not provided, Unauthorized access"
        })
    }

    // verifying if the token is created by our server only or not 
    let decoded = null
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (err) {
        return res.status(401).json({
            message: "Unauthorized user"
        })
    }



    /**now the image has reached server, and the server needs to send the image to cloud storage provider(imagekit) . install imagekit from documentation and use it.*/
    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'), /**buffer contains file content  */
        fileName: "genAI_Badge",
        folder: "insta-clone-posts"
    })

    const post = await postModel.create({
        caption: req.body.caption,
        imgUrl: file.url,
        user: decoded.id
    })

    res.status(201).json({
        message: "Post created successfully",
        post
    })
}

module.exports = {
    createPostController
}