const mongoose = require('mongoose')

const educationSchema = new mongoose.Schema({
  education: {
    type: String,
    require: true,
  },
})

const educationModel = mongoose.model('educationCollection', educationSchema)

module.exports = educationModel
