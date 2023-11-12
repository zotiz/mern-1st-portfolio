require('dotenv').config()
const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const aboutRouter = require('./Routes/aboutRoute')
const educationRouter = require('./Routes/educationRoute')
const experienceRouter = require('./Routes/experienceRoute')
const userRouter = require('./Routes/userRoute')
const projectRouter = require('./Routes/projectRoute')
const dbConnection = require('./Config/connectDB')
const uploadRouter = require('./Routes/fileUpload')
const contactRouter = require('./Routes/contactRoute')

const server = express()

//!middleware
server.use(express.json())
server.use(cors())
server.use(
  fileUpload({
    useTempFiles: true,
  }),
)

//routes
server.use('/', aboutRouter)
server.use('/', educationRouter)
server.use('/', experienceRouter)
server.use('/', userRouter)
server.use('/', projectRouter)
server.use('/', uploadRouter)
server.use('/', contactRouter)

//database connection
const database_url = process.env.MONGO_URL
dbConnection(database_url)

//listen to port
const port = process.env.PORT || 8000
server.listen(port, () => {
  console.log('server running on port ' + port)
})
