const { verify } = require("jsonwebtoken")
const Blog = require("../models/blog")
const verifyToken = require("../middlewares/verifyToken")
const blogController = require("express").Router()



blogController.get("/getAll", async(req, res) => {
    try {
        const blogs = await Blog.find({}).populate("userId", "-password")
        return res.status(201).json(blogs)
    } catch (error) {
        return res.status(500).json(error)
    }
})


blogController.get("/find/:id", async(req, res) => {
    try {
        const blog = await Blog.find(req.params.id).populate("userId", "-password")
        blog.views += 1
        await blog.save
        return res.status(201).json(blog)
    } catch (error) {
        return res.status(500).json(error)
    }
})

blogController.get("/featured", async (req, res) => {
    try {
        const blog = await Blog.find({featured: true}).populate("userId", "-password").limit(3)
        return res.status(200).json(blog)
    } catch (error) {
        return res.status(500).json(error)
    }
})


blogController.post("/", verifyToken, async(req, res) => {
    try {
        const blog = await Blog.create({...req.body, userId: req.body.id})
        return res.status(200).json(blog)
    } catch (error) {
        return res.status(500).json(error)
    }
})


blogController.put("/updatedblog/:id", verifyToken, async(req, res)=>{
    try {
        const blog = await Blog.findById(req.params.id)
        // console.log(blog.id)
        if(blog.id !== req.user.id){
            console.log(blog.id, req.user.id)
            throw new Error("You can update ur post only")
        } 
        const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true}) 
        .populate('userId', '-password')

        return res.status(200).json(updatedBlog)
    } catch (error) {
        return res.status(500).json(error.message)
    }
})


blogController.put("/likeblog/:id", verifyToken, async(req, res) => {
     try {
        const blog = await Blog.findById(req.params.id)
        if(blog.likes.includes(req.user.id)){
            blog.likes = blog.likes.filter((userId) => userId !== res.user.id)
            await blog.save()

            return res.status(200).json({message: "Successfully unliked"})
        } else{
            blog.likes.push(req.user.id)
            await blog.save()

            return res.status(200).json({message: "successfully liked"})
        }
     } catch (error) {
        return res.status(500).json(error)
     }
})

blogController.delete('/delete/:id', verifyToken, async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id)
        // console.log(blog.id)
        if(blog.id.toString() !== req.user.id.toString()){
            console.log(blog.id, req.user.id)
            throw new Error("You can delete ur own post")
        }
        await Blog.findByIdAndDelete(req.params.id)

        return res.status(200).json({message: "successfully deleted"})
    } catch (error) {
        return res.status(500).json(error.message)
    }
})



module.exports = blogController