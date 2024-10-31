import { Schema } from 'mongoose';
import mongoose from "../utils/db.js";

const gallerySchema = new mongoose.Schema({
    imageType: {
        type: String,
        required:[true,'tipe foto harus diisi']
    },
    imageUrl:{
        type: String,
    },
    product:[{
    type: Schema.Types.ObjectId,
    ref:"Products"
    }],
    store:[{
        type: Schema.Types.ObjectId,
        ref: 'Store'
    }]
}, { timestamps: true})

const galleryCollection = mongoose.model('Gallery', gallerySchema)

export default galleryCollection
