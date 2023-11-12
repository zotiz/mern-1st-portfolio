const express = require('express')
const aboutControllers = require('../Controllers/aboutCtrls')
const router = express.Router()

//...............ABOUT...........

//!get about details
router.get('/about', aboutControllers.getAbout)
//!add about detail
router.post('/about', aboutControllers.postAbout)
//!get about detail by id
router.get('/about/:id', aboutControllers.getAboutById)
//!update about detail by id
router.put('/about/update/:id', aboutControllers.updateAboutById)
//!delete about detail by id
router.delete('/about/delete/:id', aboutControllers.deleteAboutById)

module.exports = router
