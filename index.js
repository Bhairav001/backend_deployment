const express = require("express")
const { connection } = require("./config/db")
const { authenticate } = require("./middlewares/authenticate.middleware")
const { postRouter } = require("./routes/Post.route")
const { userRouter } = require("./routes/User.route")
const cors = require("cors")
const app = express()
require("dotenv").config()
app.use(express.json());

app.use(cors());

app.get("/",(req,res)=>{
    res.send("Home Page")
})

app.use("/users", userRouter)
app.use(authenticate)
app.use("/posts",postRouter)
app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("connected to DB")
    } catch (error) {
        console.log(error)
    }
    console.log(`server has running port ${process.env.port}`)
})