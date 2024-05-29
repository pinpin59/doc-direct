const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const auth = require('../middlewares/auth')
const upload = require('../multer-config');

router.get('/:id', auth, userController.getUserById)
router.post('/:id/upload-user-profile-picture',auth,upload.single('profilePicture'), userController.updateProfilePictureUser)
router.put('/:id',auth, userController.updateUser)
router.delete('/:id',auth, userController.deleteUser)


module.exports = router