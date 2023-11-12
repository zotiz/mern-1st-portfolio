const express = require('express')
const experienceController = require('../Controllers/experienceCtrls')

const router = express.Router()

//..................Experience......................

//! get experience details
router.get('/experience', experienceController.getExperiences)
//! add experience detail
router.post('/experience', experienceController.addExperience)
//! get experience detail by id
router.get('/experience/:id', experienceController.getExperienceById)
//! update experience detail by id
router.put('/experience/update/:id', experienceController.updateExperienceById)
//! delete experience detail by id
router.delete(
  '/experience/delete/:id',
  experienceController.deleteExperienceById,
)
module.exports = router
