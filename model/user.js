const salt = "##22##22Anmol7900!!^^&&*($%^&*(*&^%$#@#$%^&*)(*&^%$#@";
const { createHmac } = require('node:crypto');
const mongoose = require("mongoose")
const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})


userSchema.pre("save" ,function(next){
    const user =this;

    if(!user.isModified("password")) return;

    const hashpassword = createHmac('sha256', salt)
               .update(user.password)
               .digest('hex');
    console.log(hashpassword)
    this.password = hashpassword;
    next()
} )

userSchema.static("matchPassword" ,async function(email,password){
    const user = await USER.find({email})
    console.log(user)
    if(!user) return false;
    const hashpassword = user.password;
    const userEnteredPassword = createHmac('sha256', salt)
            .update(password)
            .digest('hex');
    if(hashpassword === userEnteredPassword){
        return user
    }
})

const USER = mongoose.model("USER" , userSchema)

module.exports = USER;