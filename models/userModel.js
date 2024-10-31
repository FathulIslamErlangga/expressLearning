import mongoose from '../utils/db.js';
// import {autoIncrement} from '../utils/db.js';
import bcrypt from 'bcryptjs';
import validator from 'validator';
import { Schema } from 'mongoose';


const userScema = new mongoose.Schema({
 name: {
    type: String,
    required: [true, 'Nama Harus diisi'],
    unique: [true, 'username telah digunakan']
 },
 email: {
    type: String,
    required: [true, 'Email Harus diisi'],
    unique: [true, 'Email telah digunakan'],
    validate : {
        validator: validator.isEmail,
        message: 'Fromat email tidak sesuai'
    }
 },
 password: {
    type: String,
    required:[true, 'Password Harus diisi'],
    minLength: [6, 'Password minimal 6 karater']
 },
 role: {
    type: String,
    enum: ['user', 'saller','admin'],
    default:'user'
 },
 profile:[{
    type: Schema.Types.ObjectId,
    ref:"Profile"
 }],
 store:[{
    type: Schema.Types.ObjectId,
    ref:"Store"
 }]
 
}, {timestamps:true});

// userScema.plugin(autoIncrement)
userScema.pre('save', async function(){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

userScema.methods.comparePassword = async function(candidatePassword){
    return await bcrypt.compare(candidatePassword, this.password)
}

const userCollection =  mongoose.model('Users', userScema);

export default userCollection