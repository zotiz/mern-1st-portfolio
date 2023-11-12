const mongoose = require('mongoose')

const dbConnection = async (mongo_url) => {
  try {
    await mongoose.connect(mongo_url)
    console.log('database connection successfully')
  } catch (error) {
    console.log(error.message)
  }
}

module.exports = dbConnection
