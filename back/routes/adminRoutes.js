const express = require('express')
const router = express.Router()
const adminController = require('../controllers/adminController')
const auth = require('../middlewares/auth')
const admin = require('../middlewares/admin')

// Partie professionnels de santé
router.put('/status/:id',auth, admin, adminController.updateHealthProfessionalStatus)
router.put('/health-professionals/:id',auth, admin, adminController.updateHealthProfessional)
router.delete('/health-professionals/:id',auth, admin, adminController.deleteHealthProfessional)
router.get('/status/:status',auth,admin, adminController.getHealthProfessionalsStatus)
// Partie users
router.get('/users', auth, admin, adminController.getAllUsers)
router.put('/users/:id', auth, admin, adminController.updateUser)
router.delete('/users/:id', auth, admin, adminController.deleteUser)




module.exports = router