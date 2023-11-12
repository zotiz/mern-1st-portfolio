const userModel = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const auth = require('../Middleware/auth')

class userController {
  // register
  static register = async (req, res) => {
    const { username, email, password } = req.body
    try {
      const user = await userModel.findOne({ email })
      if (user) {
        return res.status(400).json({ message: 'Email already exists' })
      }
      const salt = await bcrypt.genSalt(10)
      const hashPassword = await bcrypt.hash(password, salt)
      const newUser = new userModel({
        username: username,
        email: email,
        password: hashPassword,
      })
      await newUser.save()
      res.status(200).json({
        status: 'success',
        message: 'Registeration successfully!',
        newUser,
      })
    } catch (error) {
      return res.status(500).json({
        status: 'failed',
        message: 'server error',
      })
    }
  }

  //login
  static login = async (req, res) => {
    const { email, password } = req.body
    try {
      const user = await userModel.findOne({ email })
      if (!user) {
        return res.status(400).json({
          status: 'failed',
          message: 'Invalid login credentials',
        })
      }
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        return res.status(400).json({
          stataus: 'failed',
          message: 'Invalid login credentials',
        })
      }
      // if login is successful
      const payload = {
        id: user._id,
        name: user.username,
      }
      // generate token

      const token = jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: '1d',
      })
      res.status(200).json({
        status: 'success',
        message: 'Login success',
        token,
      })
    } catch (error) {
      return res.status(500).json({
        status: 'failed',
        message: 'server error',
      })
    }
  }
  //verify
  static verify = async (req, res) => {
   
    try {
      // const token = req.header("Authorization")
      // if(!token){
      //   return res.status(400).json({
      //     status:'failed',
      //     message:'Invalid Token!'
      //   })
      // }
      // jwt.verify(token, process.env.SECRET_KEY, async(err, verifyed)=>{
      //   if(err) return res.send(false)
      //   const user = await userModel.findById(verifyed.id)
      //   if(!user) return res.send(false)
      //   return res.send(true)
      // })
      const user = await userModel.findById(req.user.id)
      if (!user) return res.send(false)
      return res.send(true)
    } catch (error) {
      return res.status(500).json({
        status: 'failed',
        message: 'server error',
      })
    }
  }
}

module.exports = userController
