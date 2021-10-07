const db = require('../databases/postgres')
const sendEmail = require('./nodemail')
const newsLetterTemplate = require('../utils/email-templates/newsletterTemplate')
const cron = require('node-cron');


const sendNewsLetter = async () => {
  try {

    const {rows} = await db.query('SELECT "email", "lastname", "firstname" FROM "user"')
    // rows.forEach(async user => {
    //   const emailBody = newsLetterTemplate(user)
    //   await sendEmail(user.email, "newsletter", emailBody)
    // })

    const emailBody = newsLetterTemplate(rows[0])
    await sendEmail("ochaleto@gmail.com", "newsletter", emailBody)
  

  } catch (error) {
    console.log(error.message)
  }


}

sendNewsLetter()

// cron.schedule('0,15,30,45 * * * * *', sendNewsLetter)


