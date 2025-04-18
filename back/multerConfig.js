const multer = require('multer');
const path = require('path');
const fs = require('fs');


const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        const uploadsDir = path.join(__dirname, './uploads');

        // Vérifie si le dossier uploads existe, sinon création du dossier
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

const fileFilter = (req, file, cb) => {
    // Vérifiez l'extension du fichier
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(null, false);
        return cb(new Error('Seuls les fichiers .png, .jpeg, et .jpg sont autorisés'));
    }
};

// instance de multer
const upload = multer({ storage, fileFilter });

module.exports = upload;
