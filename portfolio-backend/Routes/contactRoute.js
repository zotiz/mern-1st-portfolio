const express = require('express')
const router = express.Router()
const nodemailer = require('nodemailer')

router.get('/contact', (req, res) => {
  res.send('contacted')
})

router.post('/contact', (req, res) => {
  const data = req.body
  let smtpTransport = nodemailer.createTransport({
    service: 'Gmail',
    port: 465,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASSWORD,
    },
  })

  // Error handling for creating the transport
  smtpTransport.verify(function (error, success) {
    if (error) {
      console.error('Error creating transport:', error)
      return res.status(500).json({
        status: 'failed',
        message: 'Internal server error',
      })
    } else {
      console.log('Transport created successfully')
    }
  })

  let mailOptions = {
    from: data.email,
    to: process.env.GMAIL_USER,
    subject: `Message from ${data.name}`,
    html: `
      <h3>Information</h3>
      <ul>
        <li>Name: ${data.name}</li>
        <li>Email: ${data.email}</li>
      </ul>
      <h3>Message</h3>
      <p>${data.message}</p>
    `,
  }

  smtpTransport.sendMail(mailOptions, (err, info) => {
    try {
      if (err) {
        console.error('Error sending email:', err)
        return res.status(400).json({
          status: 'failed',
          message: 'Failed to send email',
        })
      } else {
        console.log('Message sent:', info.response)
        return res.status(200).json({
          status: 'success',
          message: 'Message was sent successfully',
        })
      }
    } catch (error) {
      console.error('Error:', error)
      return res.status(500).json({
        status: 'failed',
        message: 'Internal server error',
      })
    }
  })
})

module.exports = router
