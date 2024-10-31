import mongoose from "../utils/db.js";
import { Schema } from "mongoose";
import slugify from "slugify";

const categorySchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'nama kategory harus diisi']
    },
    slug:{
        type: String,
    },

    product:[{
        type: Schema.Types.ObjectId,
        ref: 'Products'
    }]

    
},{timestamps:true})

categorySchema.pre('save', function(next){
    if(this.name){
        this.slug = slugify(this.name, {lower:true, strict:true})
    }
    next();
})

 
   const categoryCollection = mongoose.model('Category', categorySchema)

export default categoryCollection
