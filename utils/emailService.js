const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.eu',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_API_KEY,
  },
})

const sendVerificationEmail = (to, code) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: to,
    subject: 'Verification Code',
    text: `Your verification code is: ${code}`,
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error)
      return false
    } else {
      console.log('Email sent: ' + info.response)
      return true
    }
  })
}

module.exports = { sendVerificationEmail }
