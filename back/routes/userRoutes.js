const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const auth = require('../middlewares/auth')
const admin = require('../middlewares/admin')
const upload = require('../multer-config');

router.get('/', auth, admin, userController.getAllUsers)
router.get('/:id', auth, userController.getUserById)
router.post('/', userController.createUser)
router.post('/:id/upload-user-profile-picture',upload.single('profilePicture'), userController.updateProfilePictureUser)
router.put('/:id',auth, userController.updateUser)
router.delete('/:id',auth, userController.deleteUser)


module.exports = router