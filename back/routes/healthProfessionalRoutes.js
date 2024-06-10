const express = require('express')
const router = express.Router()
const healthProfessionalController = require('../controllers/healthProfessionalController')
const auth = require('../middlewares/auth')
const upload = require('../multerConfig');


router.get('/', healthProfessionalController.getAllHealthProfessionals)
router.get('/:id', healthProfessionalController.getHealthProfessionalById)
router.get('/user/:id', healthProfessionalController.getUserById)
router.post('/:id/upload-health-professional-profile-picture', auth,upload.single('profilePicture'), healthProfessionalController.updateProfilePictureHealthProfessional)
router.put('/:id',auth, healthProfessionalController.updateHealthProfessional)
router.delete('/:id',auth, healthProfessionalController.deleteHealthProfessional)

module.exports = router