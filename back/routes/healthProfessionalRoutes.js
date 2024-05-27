const express = require('express')
const router = express.Router()
const healthProfessionalController = require('../controllers/healthProfessionalController')
const auth = require('../middlewares/auth')
const admin = require('../middlewares/admin')
const upload = require('../multer-config');


router.get('/', healthProfessionalController.getAllHealthProfessionals)
router.get('/:id', healthProfessionalController.getHealthProfessionalById)
router.get('/status/:status', healthProfessionalController.getHealthProfessionalsStatus)
router.post('/:id/upload-health-professional-profile-picture',upload.single('profilePicture'), healthProfessionalController.updateProfilePictureHealthProfessional)
router.put('/:id',auth, healthProfessionalController.updateHealthProfessional)
router.put('/status/:id', healthProfessionalController.updateHealthProfessionalStatus)
router.delete('/:id',auth, healthProfessionalController.deleteHealthProfessional)

module.exports = router