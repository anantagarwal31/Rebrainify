import mongoose,{ model, Schema } from "mongoose";

const UserSchema = new Schema({
    username: {type: String, unique: true},
    password: String
})

const ContentSchema = new Schema({
    title: { type: String, required: true },
    link: { type: String, required: false },
    text: { type: String, required: false }, 
    type: { type: String, required: true },
    tags: [{type: mongoose.Types.ObjectId, ref: 'Tag'}],
    userId: {type: mongoose.Types.ObjectId, ref: 'User', required: true},
})

const LinkSchema = new Schema({
    hash: String,
    userId: {type: mongoose.Types.ObjectId, ref: 'User', required: true, unique: true },
})

export const UserModel = model("User", UserSchema);
export const ContentModel = model("Content", ContentSchema);
export const LinkModel = model("Links", LinkSchema);