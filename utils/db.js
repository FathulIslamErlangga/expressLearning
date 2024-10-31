import mongoose from "mongoose";
import dotenv from "dotenv";
import autoIncrementFactory from "mongoose-sequence"
const autoIncrement = autoIncrementFactory(mongoose)
dotenv.config();

mongoose.connect(process.env.DATABASE).then(() =>{
    console.log("connected to mongodb")
}).catch((err) => {
    console.log(err)
})

export default mongoose
export {autoIncrement}