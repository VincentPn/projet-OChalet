const db = require('../databases/postgres');
const sendEmail = require('./nodemailer');
const newsLetterTemplate = require('../utils/email-templates/newsletterTemplate');


module.exports = async (request, response) => {
  try {

    const {rows} = await db.query('SELECT "email", "lastname", "firstname" FROM "user"');
    if(!rows.length) return response.status(404).send({error: "no user found in database"});
    const users = rows.map(user => {
      return {name: `${user.firstname} ${user.lastname}`, email: user.email};
    });
    for (const user of users) {
      const emailBody = newsLetterTemplate(user);
      await sendEmail(user.email, "Super promo O'chalet", emailBody);
    };
    response.json({message: "newsletter sent"});

  } catch (error) {
    response.status(500).send({ error: error.message })
  }
};




