const aboutModel = require('../models/aboutModel')

class aboutControllers {
  //get about
  static getAbout = async (req, res) => {
    try {
      const about = await aboutModel.find({})
      res.status(200).json({
        status: 'success',
        message: 'post fetched successfully',
        about,
      })
    } catch (error) {
      res.status(500).json({
        status: 'failed',
        message: 'server problem',
      })
    }
  }

  //post about
  static postAbout = async (req, res) => {
    const { about } = req.body

    try {
      const newAbout = new aboutModel({
        about,
      })
      await newAbout.save()
      res.status(201).json({
        status: 'success',
        message: 'post successfully created!',
        newAbout,
      })
    } catch (error) {
      res.status(500).json({
        status: 'failed',
        message: 'server problem',
      })
    }
  }

  //get about by id
  static getAboutById = async (req, res) => {
    try {
      const about = await aboutModel.findById(req.params.id)
      res.status(200).json({
        status: 'success',
        message: 'Individual post fetch successfully',
        about,
      })
    } catch (error) {
      res.status(500).json({
        status: 'failed',
        message: 'server problem',
      })
    }
  }

  //update about by id
  static updateAboutById = async (req, res) => {
    try {
      const newAbout = await aboutModel.findByIdAndUpdate(
        req.params.id,
        {
          $set: { about: req.body.about },
        },
        { new: true },
      )

      res.status(200).json({
        status: 'success',
        message: 'post update successfully',
        newAbout,
      })
    } catch (error) {
      res.status(500).json({
        status: 'failed',
        message: 'server problem',
      })
    }
  }

  //delete about by id
  static deleteAboutById = async (req, res) => {
    try {
      const about = await aboutModel.findByIdAndDelete(req.params.id)

      res.status(200).json({
        status: 'success',
        message: 'post deleted successfully',
        about,
      })
    } catch (error) {
      res.status(500).json({
        status: 'failed',
        message: 'server problem',
      })
    }
  }
}
module.exports = aboutControllers
