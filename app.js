require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const userRoute = require("./routes/user")
const blogRoute = require("./routes/blog")
const BLOG = require("./model/blog")
const path = require("path")
const {validateUser} = require("./services/auth")
const app = express();

const PORT = process.env.PORT ||3000;



mongoose.connect(process.env.MONGO_URL)
    .then(()=>{console.log("Mongodb Connected")})

app.set("view engine" , "ejs")
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.use(express.static(path.resolve("./public")))

app.use((req, res, next) => {
    if (req.cookies.token) {
        const user = validateUser(req.cookies.token);
        if (user) {
            req.user = user;
        }
    }
    next(); // Call next() only once, outside the if-else block
});
app.use("/user",userRoute)
app.use("/blogs",blogRoute)

app.get("/" , async (req,res)=>{
    const blogs = await BLOG.find({})
    res.render("home" , {user:req.user , blogs:blogs})
})

app.listen(PORT , ()=>{
    console.log("Server started")
})