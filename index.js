const express = require("express");
const mongoose = require("mongoose")
const cors = require("cors");                 // cors is for to handle the Ports of frontend and backend
const authController = require("./controllers/auth");
const blogController = require("./controllers/blogController");
const dotenv = require("dotenv").config()

const app = express()


//database connection
mongoose.connect(process.env.MONGO_URI, {family: 4}).then(()=>{
    console.log("db is successfully connected")
}).catch((err)=>{
    console.log(err)
})


app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use('/auth', authController)
app.use('/blog', blogController)

app.listen(process.env.PORT, ()=>{
    console.log(`server is running on ${process.env.PORT}`)
})