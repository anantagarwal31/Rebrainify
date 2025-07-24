import express, { Request, Response, Application } from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { z } from "zod";
import { ContentModel, UserModel, LinkModel } from "./db";
import { JWT_PASS } from "./config";
import { userMiddleware } from "./middleware";
import { random } from "./utils";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

console.log(`[${new Date().toLocaleTimeString()}] Starting MongoDB connection...`);

const connectWithRetry = () => {
    mongoose.connect("mongodb+srv://admin:ag071631@cluster0.jk2vwoq.mongodb.net/rebrainify")
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

app.post("/api/v1/signup",async (req: Request, res: Response): Promise<void> =>{
    const userBody = z.object({
        username: z.string().min(6).max(30),
        password: z.string().min(8).max(30).refine((value)=>/[A-Z]/.test(value)).refine((value)=>/[a-z]/.test(value)).refine((value)=>/[\W_]/.test(value))
    })
    const parsedUserData = userBody.safeParse(req.body);

    if(!parsedUserData.success){
        res.status(400).json({
            message:"Incorrect format",
            error: parsedUserData.error
        });
        return
    }

    const username = req.body.username;
    const password = req.body.password;

    try{
        const hashedPass = await bcrypt.hash(password, 5);

        const existingUser = await UserModel.findOne({username});
        if(existingUser){
            res.status(409).json({
                error: "Username already exists"
            })
            return;
        }

        await UserModel.create({
        username: username,
        password: hashedPass
        })

        res.status(201).json({
            message:"User signed up"
        })
    }
    catch(e){
        console.error("Signup error: ", e);
        res.status(500).json({
            error:"Internal server error"
        })
    }
})

app.post("/api/v1/signin",async (req: Request,res: Response): Promise<void>=>{
    const username = req.body.username;
    const password = req.body.password;

    try{

        if(!username || !password){
            res.status(400).json({
                error: "Username and password are required"
            })
            return;
        }

        const existingUser = await UserModel.findOne({
            username
        })

        if(!existingUser){
            res.status(404).json({
                error: "User doesn't exist"
            })
            return;
        }

        if(typeof existingUser.password !== "string") {
            res.status(500).json({ error: "User password is invalid or not set" });
            return;
        }

        const matchPass = await bcrypt.compare(password, existingUser.password);

        if (matchPass) {
            const token = jwt.sign({
                id: existingUser._id
            }, JWT_PASS)
            res.json({
                token
            })
        }
    }
    catch(e){
        console.error("Signup error: ", e);
        res.status(500).json({
            error:"Internal server error"
        })
    }
})

app.post("/api/v1/content",userMiddleware, async (req: Request ,res: Response): Promise<void>=>{
    const contentBody = z.object({
        title: z.string().min(8).max(30),
        link: z.string().min(8)
    })

    const parsedContentData = contentBody.safeParse(req.body);
    if(!parsedContentData.success){
        res.status(400).json({
            message:"Incorrect format",
            error: parsedContentData.error.flatten().fieldErrors
        });
        return;
    }

    const title = req.body.title;
    const link = req.body.link;
    const type = req.body.type;

    try{

        await ContentModel.create({
        title,
        link,
        type,
        userId: req.userId,
        tags: []
    })

    res.status(201).json({
        message: "Content added"
    })
    }
    catch(e){
        console.error("Signup error: ", e);
        res.status(500).json({
            error:"Internal server error"
        })
    }
})

app.get("/api/v1/content", userMiddleware, async (req,res)=>{
    const userId = req.userId;

    try{
        const content = await ContentModel.find({
            userId: userId
        }).populate("userId","username")
        res.status(200).json({
            content
        })
    }
    catch(e){
        console.error("Signup error: ", e);
        res.status(500).json({
            error:"Internal server error"
        })
    }
    
})

app.delete("/api/v1/content",userMiddleware, async (req,res)=>{
    const contentId = req.body.contentId;

    try{
        await ContentModel.deleteOne({
            _id: contentId,
            userId: req.userId
        })
        res.status(204).json({
            message:"Content deleted"
        })
    }catch(error){
        res.json({
            error
        })
    }
    
})

app.post("/api/v1/brain/share",userMiddleware, async (req,res)=>{
    const share = req.body.share;
    if (share) {
        const existingLink = await LinkModel.findOne({
            userId: req.userId
        });

        if (existingLink) {
            res.json({
                hash: existingLink.hash
            })
            return;
        }
        const hash = random(10);
        await LinkModel.create({
            userId: req.userId,
            hash: hash
        })

        res.json({
            hash
        })
    } else {
        await LinkModel.deleteOne({
            userId: req.userId
        });

        res.json({
            message: "Removed link"
        })
    }
})

app.get("/api/v1/brain/:shareLink", async (req, res) => {
    const hash = req.params.shareLink;

    const link = await LinkModel.findOne({
        hash
    });

    if (!link) {
        res.status(411).json({
            message: "Sorry incorrect input"
        })
        return;
    }
    // userId
    const content = await ContentModel.find({
        userId: link.userId
    })
    const user = await UserModel.findOne({
        _id: link.userId
    })

    if (!user) {
        res.status(411).json({
            message: "user not found, error should ideally not happen"
        })
        return;
    }

    res.json({
        username: user.username,
        content: content
    })

})

export default app;