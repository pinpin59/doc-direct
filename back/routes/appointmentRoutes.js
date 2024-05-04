const express = require('express')
const router = express.Router()
const appointmentController = require('../controllers/appointmentController')
const auth = require('../middlewares/auth')
const admin = require('../middlewares/admin')

router.get('/', auth, admin, appointmentController.getAllAppointments)
router.get('/:id', auth, appointmentController.getAppointmentById)
router.get('/user/:userId', auth, appointmentController.getAllAppointmentByUserId)
router.post('/',auth, appointmentController.createAppointment)
router.put('/:id',auth, appointmentController.updateAppointmentById)
router.delete('/:id',auth, appointmentController.deleteAppointmentById)
router.get('/health-professional/:healthProfessionalId',auth, appointmentController.getAllAppointmentByHealthProfessionalId)
router.get('/health-professional-count/:healthProfessionalId',auth, appointmentController.getAllAppointmentCountByHealthProfessionalId)
router.get('/user-count/:userId',auth, appointmentController.getAllAppointmentCountByUserId)



module.exports = router