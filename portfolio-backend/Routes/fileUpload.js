require('dotenv').config()
const express = require('express')
const router = express.Router()
const cloudinary = require('cloudinary').v2
const fs = require('fs')

// Upload image to cloudinary

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_APIKEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Post upload image
router.post('/upload', (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files uploaded')
    }
    const file = req.files.file
    if (file.size > 1024 * 1024) {
      removeTmp(file.tempFilePath)
      return res.status(400).json({
        status: 'failed',
        message: 'File size is too large.',
      })
    }
    if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
      removeTmp(file.tempFilePath)
      return res.status(400).json({
        status: 'failed',
        message: 'Incorrect file format',
      })
    }

    cloudinary.uploader.upload(
      file.tempFilePath,
      { folder: 'mern-portfolio' },
      async (error, result) => {
        if (error) {
          console.error('Cloudinary Upload Error:', error)
          removeTmp(file.tempFilePath)
          return res.status(500).json({
            status: 'failed',
            message: 'Error uploading image to Cloudinary',
          })
        }
        removeTmp(file.tempFilePath)
        res.json({
          public_id: result.public_id,
          url: result.secure_url,
        })
      },
    )
  } catch (error) {
    res.status(500).json({
      status: 'failed',
      message: 'server error',
    })
  }
})

// delete image
router.post('/destroy', (req, res) => {
  const { public_id } = req.body
  try {
    if (!public_id) {
      return res.status(400).json({
        status: 'failed',
        message: 'No image selected',
      })
    }
    cloudinary.uploader.destroy(public_id, async (err, result) => {
      if (err) throw err
      res.status(200).json({
        status: 'success',
        message: 'Image deleted successfully!',
      })
    })
  } catch (error) {
    res.status(500).json({
      status: 'failed',
      message: error.message,
    })
  }
})

// Remove tmp
const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err
  })
}

module.exports = router
