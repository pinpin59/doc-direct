const express = require('express')
const router = express.Router()
const healthProfessionalController = require('../controllers/healthProfessionalController')
const auth = require('../middlewares/auth')
const admin = require('../middlewares/admin')
const upload = require('../multer-config');


router.get('/',auth, healthProfessionalController.getAllHealthProfessionals)
router.get('/:id',auth, healthProfessionalController.getHealthProfessionalById)
router.post('/', healthProfessionalController.createHealthProfessional)
router.post('/:id/upload-health-professional-profile-picture',upload.single('profilePicture'), healthProfessionalController.updateProfilePictureHealthProfessional)
router.put('/:id',auth, healthProfessionalController.updateHealthProfessional)
router.delete('/:id',auth,admin, healthProfessionalController.deleteHealthProfessional)

module.exports = router