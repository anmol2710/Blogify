const express = require("express");
const USER = require("../model/user")
const router = express.Router();
const { createHmac } = require('node:crypto');
const {validateUser , createUser} = require("../services/auth")

router.get("/signup",(req,res)=>{
    res.render("signup")
})

router.get("/signin",(req,res)=>{
    if(req.cookies.token){
        const user = validateUser(req.cookies.token)
        if(user){
            return res.redirect("/")
        }
    }
    res.render("signin")
})

router.post("/signup",async(req,res)=>{
    const user = await USER.create({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    })
    const token = createUser(user.name , user.email)
    res.cookie("token" , token)
    res.redirect("/")
})

router.post("/signin",async(req,res)=>{
    console.log(req.body.email)
    const user = await USER.find({email : req.body.email})
    const hashpassword = createHmac('sha256',"##22##22Anmol7900!!^^&&*($%^&*(*&^%$#@#$%^&*)(*&^%$#@")
               .update(req.body.password)
               .digest('hex');
    if(hashpassword === user[0].password){
        const token = createUser(user[0].name , user[0].email)
        res.cookie("token" , token)
        res.redirect("/")
    }
    else{
        res.render("signin" , {
            error:"Incorrect email or password"
        })
    }
})

router.get("/logout" ,(req,res)=>{
    res.clearCookie("token").redirect("/")
})
module.exports = router;