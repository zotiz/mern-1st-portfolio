const experienceModel = require('../models/experienceModel')

class experienceController {
  // get experiences details
  static getExperiences = async (req, res) => {
    try {
      const allExperiences = await experienceModel.find({})
      res.status(200).json({
        status: 'success',
        message: 'Experience fetched successfully!',
        allExperiences,
      })
    } catch (error) {
      res.status(500).json({
        status: 'failed',
        message: 'server problem',
      })
    }
  }
  // post experience details
  static addExperience = async (req, res) => {
    const {experience} = req.body
    try {
      const newExperience = experienceModel({
        experience,
      })
      await newExperience.save()
      res.status(201).json({
        status: 'success',
        message: 'Experience datails added successfullly!',
        newExperience,
      })
    } catch (error) {
      res.status(500).json({
        status: 'failed',
        message: 'server error',
      })
    }
  }
  // get experience by id
  static getExperienceById = async (req, res) => {
    try {
      const experienceById = await experienceModel.findById(req.params.id)
      res.status(200).json({
        status: 'success',
        message: 'Experience detail fetched successfully!',
        experienceById,
      })
    } catch (error) {
      res.status(500).json({
        status: 'failed',
        message: 'server error',
      })
    }
  }
  // update experience detail
  static updateExperienceById = async (req, res) => {
    try {
      const updatedExperience = await experienceModel.findByIdAndUpdate(
        req.params.id,
        {
          $set: { experience: req.body.experience },
        },
        {
          new: 'true',
        },
      )
      res.status(200).json({
        status: 'success',
        message: 'Update Experience details successfully!',
        updatedExperience,
      })
    } catch (error) {
      res.status(500).json({
        status: 'failed',
        message: 'server error',
      })
    }
  }
  static deleteExperienceById = async (req, res) => {
    try {
      const deletedExperience = await experienceModel.findByIdAndDelete(
        req.params.id,
      )
      res.status(200).json({
        status: 'success',
        message: 'Experience deleted successfully!',
        deletedExperience,
      })
    } catch (error) {
      res.status(500).json({
        status: 'failed',
        message: 'server error',
      })
    }
  }
}

module.exports = experienceController
