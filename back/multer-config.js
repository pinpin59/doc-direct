const multer = require('multer');
const path = require('path');

// Configurez `multer` pour spécifier le dossier de stockage et le nom de fichier
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, './uploads'));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// Créez et exportez une instance de `multer` avec la configuration de stockage
const upload = multer({ storage });

module.exports = upload;
