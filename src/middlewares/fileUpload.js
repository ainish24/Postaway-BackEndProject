import multer from "multer";
import path from "path";
import { errorHandler } from "./errorHandler.js";
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(path.resolve(),'public/uploads'))
    },
    filename:function(req,file,cb){
        const originalName=file.originalname.trim().replace(/\s+/g, '')
        cb(null,originalName)
    }
})

export const upload=multer({storage,fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png' && ext!=='.HEIC') {
        return cb(new errorHandler(400,'Only images are allowed'));
    }
    cb(null, true);
}})