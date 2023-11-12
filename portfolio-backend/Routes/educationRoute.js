const express = require('express')

const router = express.Router()
const educationController = require('../Controllers/educationCtrls')

//..................Education......................

//! get education details
router.get('/education', educationController.getEducation)
//! add education detail
router.post('/education', educationController.addEducation)
//! get education detail by id
router.get('/education/:id', educationController.getEducationById)
//! update education detail by id
router.put('/education/update/:id', educationController.updateEducationById)
//! delete education detail by id
router.delete('/education/delete/:id', educationController.deleteEducationById)

module.exports = router
