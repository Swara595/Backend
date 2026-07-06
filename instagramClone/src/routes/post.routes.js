const express = require("express")
const postRouter = express.Router()
const postController = require("../controllers/post.controllers")
const multer = require("multer")
const upload = multer({ storage: multer.memoryStorage() })

/**
 * POST api/posts {protected} -> protected means only those users can request on this api who have valid token
 * req.body = {cation,img-file}
 */

postRouter.post("/", upload.single("image"), postController.createPostController)

module.exports = postRouter