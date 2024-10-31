import mongoose from "../utils/db.js";
import { Schema } from "mongoose";

const storeRegitrationSchema = new mongoose.Schema({
  storeName:{
    type:String,
    unique:[true,  " nama toko sudah digunakan orang lain"],
    required:[true,'nama toko harus diisi']
  },
  noKtp:{
    type:String,
    unique:[true,  "no ktp sudah tertera"],
    required:[true,'no ktp harus diisi'],
    minlength:[12,'no ktp minimal 12 angka']
  },
  imageKtp:{
    type: Schema.Types.ObjectId,
    ref:'Gallery'
  },
  user:{
    type: Schema.Types.ObjectId,
    ref:'Users'
  },
  status:{
        type:String,
        enum:['approve','pending','reject'],
        default:'pending'
    },

},{timestamps:true})
const storeRegitrationCollection = mongoose.model('StoreRegistration', storeRegitrationSchema)
export default storeRegitrationCollection