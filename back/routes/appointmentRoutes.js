const express = require('express')
const router = express.Router()
const appointmentController = require('../controllers/appointmentController')

router.get('/', appointmentController.getAllAppointments)
router.get('/:id', appointmentController.getAppointmentById)
router.post('/', appointmentController.createAppointment)
router.put('/:id', appointmentController.updateAppointmentById)
router.delete('/:id', appointmentController.deleteAppointmentById)
router.get('/user/:userId', appointmentController.getAllAppointmentByUserId)
router.get('/health-professional/:healthProfessionalId', appointmentController.getAllAppointmentByHealthProfessionalId)
router.get('/health-professional-count/:healthProfessionalId', appointmentController.getAllAppointmentCountByHealthProfessionalId)
router.get('/user-count/:userId', appointmentController.getAllAppointmentCountByUserId)



module.exports = router