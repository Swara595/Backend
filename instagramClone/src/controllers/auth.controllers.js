const userModel = require("../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

/** POST /api/auth/register */
async function registerController(req, res) {
    const { username, email, password, bio, profileImage } = req.body

    const isUserAlreadyExists = await userModel.findOne({
        $or: [
            /** $or operator requires 2 conditions in array format  */
            { username }, /**first condition */
            { email } /** second condition */
        ]
    })

    if (isUserAlreadyExists) {
        return res.status(409).json({
            message: "User already exists" + (isUserAlreadyExists.email == email ? "Email already exists" : "Username already exists")
        })
    }

    const hash = await bcrypt.hash(password, 10) /** 10 indicates how many times hashing should be done  */

    const user = await userModel.create({
        username,
        email,
        password: hash,
        bio,
        profileImage
    })

    //creating token
    const token = jwt.sign({
        /** needs user ka data and aisa data jo unique ho */
        id: user._id
    },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )

    //setting token into cookie 
    res.cookie("token", token)

    res.status(201).json({
        message: "User registered",
        user: {
            email: user.email,
            username: user.username,
            bio: user.bio,
            profileImage: user.profileImage
        }

    })


}


async function loginController(req, res) {
    const {
        username, email, password } = req.body

    /** user can login on the basis of username & pass or email & pass */

    const user = await userModel.findOne({
        $or: [
            {
                username: username

            },
            {
                email: email

            }
        ]
    })

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        })
    }

    // const hash = bcrypt.hash(password,10)

    const isPasswordValid = await bcrypt.compare(password, user.password) /** converts the pass into hash and compares */

    if (!isPasswordValid) {
        return res.status(401).json({
            message: "Incorrect password"
        })
    }

    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET, { expiresIn: "1d" })

    res.cookie("token", token)

    res.status(200).json({
        message: "User logged in",
        user: {
            email: user.email,
            username: user.username,
            bio: user.bio,
            profileImage: user.profileImage
        }
    })

}

module.exports = {
    registerController,
    loginController
}
