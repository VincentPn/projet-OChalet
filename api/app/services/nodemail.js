const nodemailer = require('nodemailer')


const transporter = nodemailer.createTransport({
  service: 'gmail',
  secure: false,
  port: 25,
  tls: {rejectUnauthorized: false},
  ignoreTLS: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD
  }
});

transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
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
      if (error) reject(error)

      if(info?.response) resolve(info?.response) 
       
    });
  })

}


