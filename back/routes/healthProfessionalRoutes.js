const express = require('express')
const router = express.Router()
const healthProfessionalController = require('../controllers/healthProfessionalController')
const auth = require('../middlewares/auth')
const admin = require('../middlewares/admin')

router.get('/',auth, healthProfessionalController.getAllHealthProfessionals)
router.get('/:id',auth, healthProfessionalController.getHealthProfessionalById)
router.post('/', healthProfessionalController.createHealthProfessional)
router.put('/:id',auth, healthProfessionalController.updateHealthProfessional)
router.delete('/:id',auth,admin, healthProfessionalController.deleteHealthProfessional)

module.exports = router