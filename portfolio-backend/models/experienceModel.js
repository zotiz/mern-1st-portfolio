const mongoose = require('mongoose')

const experienceSchema = new mongoose.Schema({
  experience: {
    type: String,
    require: true,
  },
})

const experienceModel = mongoose.model('experienceCollection', experienceSchema)

module.exports = experienceModel
