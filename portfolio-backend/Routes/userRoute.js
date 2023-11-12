const express = require('express')
const router = express.Router()
const userController = require('../Controllers/userCtrls')
const auth = require('../Middleware/auth')

//...........User........

//!register
router.post('/register', userController.register)
//!login
router.post('/login', userController.login)
//! verify
router.get('/verify', auth, userController.verify)
module.exports = router
