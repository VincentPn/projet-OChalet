const {Message} = require('../models');

const messageController = {

    findAll: async (_, response) => {
        try {
            const messages = await Message.findAll();
            for(const message of messages) {
              
              for(const field in message) !message[field] ? delete message[field] : null
              
            }
            response.json(messages);
        } catch(error) {
            response.status(500).send(error.message);
        }
    },

    findByUserId: async (request, response) => {
      try {
          const message = await Message.findByUserId(parseInt(request.token.id, 10));
          response.json(message);
      } catch(error) {
          response.status(500).send(error.message);
      }
  },

  create: async (request, response) => {
    try {
      request.body.user_id = request.token.id
      const newMessage = new Message(request.body).create()
      response.status(201).json(newMessage);

    } catch (error) {
        response.status(500).send(error.message);
    }
  },

  update: async (request, response) => {
    try {

        await new Message(request.body).update()
    
        response.status(204).json('Update done');

    } catch (error) {
            response.status(500).send(error.message);
    }
  },

  delete: async (request, response) => {
      try {

          const messageID = parseInt(request.query.id, 10);
          
          await Message.delete(messageID);

          response.status(200).json(`Message with id ${messageID} deleted`);

      } catch(error) {
          response.status(500).send(error.message);
      }
  }

}

module.exports = messageController;
