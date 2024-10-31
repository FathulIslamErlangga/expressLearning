import mongoose from "../utils/db";
import { Schema } from "mongoose";

const profileSchema =  new mongoose.Schema({
    bio: String,
    phoneNumber: Number,
    address: String,
    imageProfile:{
        type: Schema.Types.ObjectId,
        ref:'Gallery'
    },
   user:{
    type: Schema.Types.ObjectId,
    ref: 'Users'
   }
},{timestamps: true})

const profileCollection = mongoose.model('Profile', profileSchema)
export default profileCollection