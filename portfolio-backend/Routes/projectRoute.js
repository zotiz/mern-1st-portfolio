const express = require('express')
const router = express.Router()
//const upload = require('../utils/fileUpload')
const projectControllers = require('../Controllers/projectCtrls')

//!get projects
router.get('/project', projectControllers.getProject)
//!add projects
router.post('/project', projectControllers.addProject)
//!get projects by id
router.get('/project/:id', projectControllers.getProjectById)
//!update project by id
router.put('/project/update/:id', projectControllers.updateProjectById)
//!delete project by id
router.delete('/project/delete/:id', projectControllers.deleteProjectById)

module.exports = router
