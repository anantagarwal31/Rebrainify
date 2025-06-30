import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { ContentModel, UserModel } from "./db";
import { JWT_PASS } from "./config";
import { userMiddleware } from "./middleware";

const app = express();
app.use(express.json());

console.log(`[${new Date().toLocaleTimeString()}] Starting MongoDB connection...`);

const connectWithRetry = () => {
    mongoose.connect("mongodb://localhost:27017/rebrainify")
        .then(() => {
            console.log("✅ MongoDB connected");
            app.listen(3000, () => {
                console.log("🚀 Server running on http://localhost:3000");
            });
        })
        .catch((err) => {
            console.error("❌ MongoDB connection failed. Retrying in 5s...", err.message);
            setTimeout(connectWithRetry, 5000); // Retry every 5 seconds
        });
};

connectWithRetry();



app.post("/api/v1/signup",async (req,res)=>{
    const username = req.body.username;
    const password = req.body.password;

    try{
        await UserModel.create({
        username: username,
        password: password
        })

        res.json({
            message:"User signed up"
        })
    }
    catch(e){
        res.status(401).json({
            message:"User already exists"
        })
    }
})

app.post("/api/v1/signin",async (req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    const existingUser = await UserModel.findOne({
        username,
        password
    })

    if(existingUser){
        const token = jwt.sign({
            id: existingUser._id
        }, JWT_PASS)
        res.json({
            token
        })
    }
    else{
        res.status(403).json({
            message:"Incorrect credentials"
        })
    }
})

app.post("/api/v1/content",(req,res)=>{
    const link = req.body.link;
    const type = req.body.type;
    ContentModel.create({
        link,
        type,
        user: req.userId
    })
})

app.get("/api/v1/content",userMiddleware, (req,res)=>{

})

app.delete("/api/v1/content",(req,res)=>{

})

app.post("/api/v1/brain/share",(req,res)=>{

})

app.post("/api/v1/brain/:shareLink",(req,res)=>{

})