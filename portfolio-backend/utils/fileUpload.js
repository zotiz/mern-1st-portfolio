//! Install cloudinary
//! Install multer
//! Install multer-storage-cloudinary
require('dotenv').config()
const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')

const multer = require('multer')
//* Configure cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_APIKEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const storage = new CloudinaryStorage({
  cloudinary,
  allowedFormats: ['jpg', 'png', 'jpeg'], // Fix the typo here
  params: {
    folder: 'mern-portfolio',
    transformation: [{ width: 500, height: 500, crop: 'fill' }],
  },
})
const upload = multer({ storage })
module.exports = upload
