const mongoose = require("mongoose")
const blogSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    coverImageUrl:{
        type:String,
        required:true
    },
    createdBy:{
        type:Object,
        required:true
    }
},
    {timestamp: true}
);
const BLOG = mongoose.model("BLOG" , blogSchema)

module.exports = BLOG;