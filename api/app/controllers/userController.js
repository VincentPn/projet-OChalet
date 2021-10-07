const {User, Comment, Message, Booking} = require('../models');
const bcrypt = require('bcrypt')

const userController = {

    findAll: async (_, response) => {
        try {
            const users = await User.findAll();
            for(const user of users) {
              delete user.password
              for(const field in user) !user[field] ? delete user[field] : null 
            }
            
            response.json(users);
        } catch(error) {
            response.status(500).send(error.message);
        }
    },

    findById: async (request, response) => {
        try {
            const user = await User.findById(parseInt(request.token.id, 10));
            delete user.password
            for(const key in user) !user[key] ? delete user[key] : null

            response.json(user);
        } catch(error) {
          console.log(error)
            response.status(500).send(error.message);
        }
        
    },

    update: async (request, response) => {
        try {
            if(request.body.password) {
              delete request.body.passwordConfirm
              const salt = await bcrypt.genSalt(10);
              request.body.password = await bcrypt.hash(request.body.password, salt);
            }else {
              const user = await User.findById(request.token.id)
              request.body.password = user.password
            }
            
            request.body.id = request.token.id
         
            await new User(request.body).update()
            response.status(204).json('Update done');

        } catch (error) {
          console.log(error)
            response.status(500).send(error.message);
        }
    },

    delete: async (request, response) => {
        try {

            let userID;
            userID = parseInt(request.token.id, 10);


            if(request.token.role === "admin") userID = parseInt(request.query.id, 10);

            await Comment.setUserUnknown(userID)
            
            await Message.deleteByUserId(userID)

            await Booking.setUserUnknown(userID)

            await User.delete(userID);
            response.status(200).json(`User with id ${userID} deleted`);

        } catch(error) {
            console.log(error)
            response.status(500).send(error.message);
        }
    }

}

module.exports = userController;
