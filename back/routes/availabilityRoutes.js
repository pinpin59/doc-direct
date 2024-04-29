const express = require('express')
const router = express.Router()
const availabilityController = require('../controllers/availabilityController')

router.get('/', availabilityController.getAllAvailabilities)
router.get('/:id', availabilityController.getAvailabilityById)
router.get('/health-professional/:id', availabilityController.getAvailabilityByHealthProfessionalId)
router.post('/', availabilityController.createAvailability)
router.post('/update/:id', availabilityController.updateAvailabilityById)
router.delete('/:id', availabilityController.deleteAvailabilityById)

module.exports = router