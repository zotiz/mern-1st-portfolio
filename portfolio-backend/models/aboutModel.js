const mongoose = require('mongoose')

const aboutSchema = new mongoose.Schema({
  about: {
    type: String,
    require: true,
  },
})

const aboutModel = mongoose.model('aboutCollection', aboutSchema)

module.exports = aboutModel
