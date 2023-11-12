const projectModel = require('../models/projectModel')

class projectControllers {
  // get project
  static getProject = async (req, res) => {
    try {
      const project = await projectModel.find({})
      res.status(200).json({
        status: 'success',
        message: 'Project fetched successfully',
        project,
      })
    } catch (error) {
      return res.status(500).json({
        status: 'failed',
        message: 'server error',
      })
    }
  }
  // add project
  static addProject = async (req, res) => {
    const { product_id, title, description } = req.body
    const { images } = req.body
    try {
      const newProject = new projectModel({
        product_id,
        title,
        description,
        images,
      })
      await newProject.save()
      res.status(201).json({
        status: 'success',
        message: 'Project added successfully!',
        newProject,
      })
    } catch (error) {
      return res.status(500).json({
        status: 'failed',
        message: 'server error',
      })
    }
  }
  // get project by id
  static getProjectById = async (req, res) => {
    try {
      const projectById = await projectModel.findById(req.params.id)
      res.status(200).json({
        status: 'success',
        message: 'Project fetched successfully!',
        projectById,
      })
    } catch (error) {
      return res.status(500).json({
        status: 'failed',
        message: 'server error',
      })
    }
  }
  // update project by id
  static updateProjectById = async (req, res) => {
    const { product_id, title, description } = req.body
    const { images } = req.body
    try {
      const updatedProject = await projectModel.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            product_id,
            title,
            description,
            images,
          },
        },
        { new: true },
      )
      res.status(200).json({
        status: 'success',
        message: 'Project updated successfully!',
        updatedProject,
      })
    } catch (error) {
      return res.status(500).json({
        status: 'failed',
        message: 'server error',
      })
    }
  }
  // delete project by id
  static deleteProjectById = async (req, res) => {
    try {
      const project = await projectModel.findByIdAndDelete(req.params.id)
      res.status(200).json({
        status: 'success',
        message: 'Project deleted successfully!',
        project,
      })
    } catch (error) {
      return res.status(500).json({
        status: 'failed',
        message: 'server error',
      })
    }
  }
}

module.exports = projectControllers
