const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD
  }
});

transporter.verify(function (error, success) {
  if (error) {
    console.log(error.message);
  } else {
    console.log("nodemailer connected to mailtrap");
  }
});



module.exports = (to, subject, html) => {
  return new Promise((resolve, reject) => {
    const mailOptions = {
      from: 'ochaleto@gmail.com',
      to,
      subject,
      html
    };
  
    transporter.sendMail(mailOptions, function(error, info){
      if (error) return reject(error)
      resolve(info)
    });
  })
};


