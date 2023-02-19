const express = require("express")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const { UserModel } = require("../model/User.model");
const userRouter = express.Router()

userRouter.post("/register",async(req,res)=>{
    const {email,pass,name,age} = req.body;
    try {
        bcrypt.hash(pass,5,async(err, secure_pass)=>{
            if(err){
                console.log(err)
            }else{
                const user = new UserModel({email,pass:secure_pass,name,age})
                await user.save()
                res.send({"msg":"User Registered"})
            }
        })
    } catch (error) {
        console.log({"msg":"Something went wrong","error":error.message})
    }
})




userRouter.post("/login",async(req,res)=>{
    const {email,pass} = req.body;
    try {
        const user = await UserModel.find({email})

        if(user.length){
            bcrypt.compare(pass, user[0].pass,(err,result)=>{
                if(result){
                    const token =jwt.sign({userID:user[0]._id},"masai")
                    res.send({"msg":"Login Successful","token":token})
                }else{
                    res.send({"msg":"wrong credential"})
                }
            })
        }else{
            res.send({"msg":"wrong credential"})
        }
    } catch (error) {
        console.log({"msg":"Something went wrong","error":error.message})
    }
})

module.exports={
    userRouter
}