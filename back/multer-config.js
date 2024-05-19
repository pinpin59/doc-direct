const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        const uploadsDir = path.join(__dirname, './uploads');

        // Vérifiez si le dossier `uploads` existe, sinon créez-le
        if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir, { recursive: true });
        }

        cb(null, path.join(__dirname, './uploads'));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
}); 

// instance de multer
const upload = multer({ storage });

module.exports = upload;
