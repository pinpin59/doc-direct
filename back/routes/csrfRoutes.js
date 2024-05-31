const express = require('express')
const router = express.Router()
const csrfController = require('../controllers/csrfController')

router.get('/', csrfController.getCsrfToken)

module.exports = router  