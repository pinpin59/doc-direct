const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
 
router.post('/login-user', authController.loginUser)
router.post('/register-user', authController.registerUser)
router.post('/login-health-professional', authController.loginHealthProfessional)
router.post('/register-health-professional', authController.registerHealthProfessional)

module.exports = router  