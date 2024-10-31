import multer from "multer";
import path from 'path';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads')
    },
    filename: (req, file, cb) =>{
        const pathExt = path.extname(file.originalname);
        cb(null , `${file.fieldname}-${Date.now()}${pathExt}`)
    }
});

const fileFilter = (req, file, cb) =>{
    const imagesType = ['image/jpeg','image/jpg','image/png'];
    if(imagesType.includes(file.mimetype)){
        cb(null, true)
    }else{
    cb( new Error('format file tidak sesuai'), false)
    }
}

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 4
    }
})

export default upload