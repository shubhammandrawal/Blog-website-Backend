const express = require("express");
const mongoose = require("mongoose")
const cors = require("cors");                 // cors is for to handle the Ports of frontend and backend
const authController = require("./controllers/auth");
const blogController = require("./controllers/blogController");
const multer = require("multer");
const dotenv = require("dotenv").config()

const app = express()


//database connection
mongoose.connect(process.env.MONGO_URI, {family: 4}).then(()=>{
    console.log("db is successfully connected")
}).catch((err)=>{
    console.log(err)
})

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use('/auth', authController)
app.use('/blog', blogController)


//multer
const storage = multer.diskStorage({
    destination: function(req, file, callback){
        callback(null, 'public/images')
    },

    filename: function(req, file, callback){
        callback(null, req.body.filename)
    }
})

const upload = multer({storage: storage})

app.post('/upload' , upload.single('image'), async(req, res)=>{
    return res.status(200).json({
        message: "succesfully uploaded"
    })
})


app.listen(process.env.PORT, ()=>{
    console.log(`server is running on ${process.env.PORT}`)
})