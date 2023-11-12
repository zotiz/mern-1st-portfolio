const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
  
  try {
    const token = req.header('Authorization')
    if (!token) {
      return res.status(400).json({
        status: 'failed',
        message: 'Invalied Authorization!',
      })
    }
    jwt.verify(token, process.env.SECRET_KEY, (error, user) => {
      if (error) {
        return res
          .status(400)
          .json({ status: 'failed', message: 'Authorization is not valid!' })
      }
      req.user = user
      next()
    })
  } catch (error) {
    return res.status(400).json({
      status: 'failed',
      message: error.message,
    })
  }
}

module.exports = auth
