import mongoose from "../utils/db.js";
import { Schema } from "mongoose";
import slugify from "slugify";

const brandSchema = new mongoose.Schema({
    name:{
        type:String,
        unique:[true, 'nama brand sudah tersedia']
    },
    slug:{
        type:String
    },

    brandImage:[{
        type: Schema.Types.ObjectId,
        ref:'Gallery'
    }],
    
    product:[{
        type: Schema.Types.ObjectId,
        ref: 'Products'
    }],
}, { timestamps: true})

brandSchema.pre('save', function(next) {
    if(this.name)
    {
        this.slug = slugify(this.name, {lower: true, strict: true})
    }

    next()
})

const brandCollection = mongoose.model('Brand', brandSchema)

export default brandCollection;
