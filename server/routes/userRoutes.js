const {Router} = require('express')

const {registerUser, loginUser, getUser, changeAvatar, editUser, forgetPass, editPassword, getAuthors} = require ("../controllers/userControllers")
const authMiddleware = require('../middleware/authMiddleware')
const router = Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/forget-password/', forgetPass)
router.get('/:id', getUser)
router.get('/', getAuthors)
router.post('/change-avatar', authMiddleware, changeAvatar)
router.patch('/edit-user', authMiddleware, editUser)
router.patch('/reset-password/:id/:token', editPassword)

module.exports = router

