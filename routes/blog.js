const express = require("express")
const router = express.Router();
const multer = require("multer");
const BLOG = require("../model/blog")
const path = require("path")
router.get("/addblog" , (req,res)=>{
    res.render("addblog", {user:req.user})
})

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve("./public/uploads"))
    },
    filename: function (req, file, cb) {
      cb(null,`${Date.now()} - ${file.originalname}`)
    }
  })
  
  const upload = multer({ storage: storage })
  

router.post("/addblog",upload.single("file") , async (req, res) => {
      const blog = await BLOG.create({
            title: req.body.title,
            content: req.body.content,
            coverImageUrl:`/uploads/${req.file.filename}`,
            createdBy: req.user
      });
    // return res.redirect(`/blogs/${blog._id}}`)
    return res.redirect("/")
});


router.get("/:id" , async (req,res)=>{
  const blog = await BLOG.findById(req.params.id);
  res.render("blog" , {user:req.user , blog:blog})
})

module.exports = router;