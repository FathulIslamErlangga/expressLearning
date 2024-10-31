import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
// Router
import router from "./routes/authRouter.js";
import category from "./routes/categoryRouter.js";
import product from "./routes/productRouter.js";
import galleryRoute from "./routes/galleryRouter.js";
import store from "./routes/storeRouter.js";
import adminRoute from "./routes/adminRouter.js";
import variant from "./routes/variantRouter.js";
import profile from "./routes/profileRouter.js";
//etc
import {notFound, hendlerError} from './middleware/errorMiddleware.js'
const app = express();
dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use('/api/admin', adminRoute);
app.use('/api/', category);
app.use('/api/auth', router);
app.use('/api/profile',profile )
app.use('/api/store', store);
app.use('/api/product', product , category);
app.use('/api/variant', variant)
app.use('/api/image', galleryRoute)
app.use(notFound);
app.use(hendlerError);

const port = process.env.PORT
app.listen(port, () =>{
    console.log(`Sonyunara app listening at http://localhost:${port}/`);
});