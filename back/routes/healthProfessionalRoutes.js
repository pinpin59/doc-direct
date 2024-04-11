const express = require('express')
const router = express.Router()
const healthProfessionalController = require('../controllers/healthProfessionalController')

router.get('/', healthProfessionalController.getAllHealthProfessionals)
router.get('/:id', healthProfessionalController.getHealthProfessionalById)
router.post('/', healthProfessionalController.createHealthProfessional)
router.put('/:id', healthProfessionalController.updateHealthProfessional)
router.delete('/:id', healthProfessionalController.deleteHealthProfessional)

module.exports = router