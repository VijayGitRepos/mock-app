import { Router } from "express";
import multer from "multer";
import path from 'path'
import { fileDownloadController, fileUploadController, initiateFileUpload } from "../controllers/fileController.js";

const router = Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedExtensions = /jpeg|jpg|png|pdf|docx|zip|txt/;
    const allowedMimeTypes = /jpeg|jpg|png|pdf|document|zip|plain/;
    
    const extname = allowedExtensions.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedMimeTypes.test(file.mimetype.toLowerCase());

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb(new Error('Error: Only images, PDFs, docs, text, and zip archives are allowed!'));
    }
};


const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }
});

router.get('/', initiateFileUpload);
router.post('/upload', upload.single('myFile'), fileUploadController);
router.get('/download/:filename', fileDownloadController);

export default router
