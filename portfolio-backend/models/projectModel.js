const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
  product_id: {
    type: String,
    unique: true,
    require: true,
  },
  title: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    require: true,
  },
  images: {
    type: Object,
    require: true,
  },
})

const projectModel = mongoose.model('projectCollection', projectSchema)

module.exports = projectModel
