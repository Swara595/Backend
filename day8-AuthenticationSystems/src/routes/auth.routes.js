// all apis related to authentication are created here and exported to app.js
const express = require("express")
const userModel = require("../models/user.model") /**to save the data to dB, we need to import the userModel */
const jwt = require("jsonwebtoken")
const crypto = require("crypto")


const authRouter = express.Router()
// whenever u want to create any api in any file other than app.js , we use express.Router()

/**steps for creating the register api
 * while registering, user will give 3 things : name, email, password , this data comes in req.body, with this data create a new user and send response
 */
authRouter.post("/register", async (req, res) => {
    const { name, email, password } = req.body

    const isUserAlreadyExists = await userModel.findOne({ email })

    if (isUserAlreadyExists) {
        return res.status(409).json({
            message: "User account already exists with this email"
        })
    }

    const hash = crypto.createHash("md5").update(password).digest("hex")

    const user = await userModel.create({
        name, email, password: hash

    })

    //creating token
    const token = jwt.sign(
        //for creating token we need 2 things : user data and jwt secret key
        // for user data we only pass the id of the user created
        // we do not store any sensitive info in the token
        {
            id: user._id,
            email: user.email
        },
        process.env.JWT_SECRET
    )

    // setting the token into cookie
    res.cookie("jwt_token", token)

    res.status(201).json({
        message: "User registered successfully",
        user,
        token /**sending the token created by the server as response */
    })

    /** token server ne create krke user ko de diye, abhi iske baad user jo bhi req karega us req ke saath token jana chahiye - for this, we use storages.i.e cookies storage */

    /** cookies storage - special type of storage , it is present on the client side. Our server will have direct access to cookies storage. the server can write any data to the cookies storage & if any data is present in cookies storage, the server can read it as well . whenever token is created, set it into cookies. for this install package "cookie-parser". All the browsers have cookie storage */

    /** why to set the token in cookie - so that if any user sends any req, the server can directly read the data from the token and we dont need to write code manually for setting the token into cookies */

    /** token is not created everytime. it is created only 2 times -  when the user registers & when the user logs in */
})

authRouter.post("/protected", (req, res) => {
    console.log(req.cookies)
    res.status(200).json({
        message: "This is a protected route"
    })
})

// sabhi functions jo tab execute hote hai jab api pe req aati hai,aise functions ko controllers kehte hai

authRouter.post("/login", async (req, res) => {
    const { email, password } = req.body

    // check if details are correct 
    const user = await userModel.findOne({ email })

    if (!user) {
        return res.status(404).json({
            message: "User not fount with this email address "
        })
    }

    // check is password is correct 
    const isPasswordMatched = user.password == crypto.createHash("md5").update(password).digest("hex")

    if (!isPasswordMatched) {
        return res.status(401).json({
            message: "Incorrect password "
        })
    }

    const token = jwt.sign(
        {
            id: user._id
        },
        process.env.JWT_SECRET
    )

    // setting the token into cookie
    res.cookie("jwt_token", token)

    res.status(201).json({
        message: "User logged in successfully",
        user,

    })

})


module.exports = authRouter