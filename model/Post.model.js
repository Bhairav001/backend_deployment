const mongoose = require("mongoose")

const postSchema = mongoose.Schema({
    title:String,
    post:String,
    category:String,
    userID:String
})

const PostModel = mongoose.model("post",postSchema)

module.exports={
    PostModel
}