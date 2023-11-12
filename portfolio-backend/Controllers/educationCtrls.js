const educationModel = require('../models/educationModel')

class educationController {
  //get education
  static getEducation = async (req, res) => {
    try {
      const allEducation = await educationModel.find({})
      res.status(200).json({
        status: 'success',
        message: 'Education details fetched successfully!',
        allEducation,
      })
    } catch (error) {
      res.status.json({
        status: 'failed',
        message: 'server error',
      })
    }
  }
  //post education
  static addEducation = async (req, res) => {
    const { education } = req.body
    try {
      const newEducation = new educationModel({
        education,
      })
      await newEducation.save()
      res.status(201).json({
        status: 'success',
        message: 'Education details post successfully',
        newEducation,
      })
    } catch (error) {
      res.status(500).json({
        status: 'failed',
        message: 'server error',
      })
    }
  }
  //get education by id
  static getEducationById = async (req, res) => {
    try {
      const educationById = await educationModel.findById(req.params.id)
      res.status(200).json({
        status: 'success',
        message: 'Education detail fetched successfully!',
        educationById,
      })
    } catch (error) {
      res.status(500).json({
        status: 'failed',
        message: 'server error',
      })
    }
  }
  //update education by id
  static updateEducationById = async (req, res) => {
    const updatedEducation = await educationModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: { education: req.body.education },
      },
      { new: true },
    )
    res.status(200).json({
      status: 'success',
      message: 'Education detail update successfully!',
      updatedEducation,
    })
  }
  //delete education by id
  static deleteEducationById = async (req, res) => {
    try {
      const deletedEducation = await educationModel.findByIdAndDelete(
        req.params.id,
      )
      res.status(200).json({
        status: 'success',
        message: 'Education detail deleted successfully!',
        deletedEducation,
      })
    } catch (error) {
      res.status(500).json({
        status: 'failed',
        message: 'server error',
      })
    }
  }
}

module.exports = educationController
