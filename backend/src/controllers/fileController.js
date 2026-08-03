import multer from 'multer';
import path from 'path';
import fs from 'fs'
import { fileURLToPath } from 'url';

export const initiateFileUpload = (req, res) => {
    res.send(`
        <h2>Node.js File Upload and Download</h2>
        <form action="/file/upload" method="POST" enctype="multipart/form-data">
            <input type="file" name="myFile" required />
            <button type="submit">Upload</button>
        </form>
    `);
}

export const fileUploadController = (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'Please choose a file to upload.' });
        }
        res.status(200).json({
            message: 'File uploaded successfully!',
            fileDetails: {
                originalName: req.file.originalname,
                savedName: req.file.filename,
                sizeInBytes: req.file.size,
                downloadUrl: `${req.protocol}://${req.get('host')}/download/${req.file.filename}`
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// export const fileDownloadController = (req, res) => {

//     const __filename = fileURLToPath(import.meta.url);
//     const __dirname = path.dirname(__filename);

//     const fileName = req.params.filename;
//     const filePath = path.join(__dirname, '../../uploads', fileName)
//     // const fileName = req.params.filename;
//     // const filePath = path.join(__dirname, 'uploads', fileName);
//     console.log("Looking for file at:", filePath);

//     if (!fs.existsSync(filePath)) {
//         return res.status(404).json({ error: 'Requested file does not exist on this server.' });
//     }

//     res.download(filePath, fileName, (err) => {
//         if (err) {
//             res.status(500).json({ error: 'Could not execute file download process.' });
//         }
//         return res.status(200).json({message:'File downloaded successfully'})
//     });
// }

export const fileDownloadController = (req, res) => {
    const fileName = req.params.filename;
    const filePath = path.resolve(process.cwd(), 'uploads', fileName);

    console.log("Looking for file at:", filePath);

    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: 'Requested file does not exist on this server.' });
    }

    res.download(filePath, fileName, (err) => {
        if (err) {
            if (!res.headersSent) {
                return res.status(500).json({ error: 'Could not execute file download process.' });
            }
        }
    });
};