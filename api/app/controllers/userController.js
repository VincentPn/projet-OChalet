const {User, Comment, Message, Booking} = require('../models');
const bcrypt = require('bcrypt')
const dayjs = require('dayjs')

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
            const user = await User.findById(request.token.id, 10);
            delete user.password;
            for(const key in user) !user[key] ? delete user[key] : null;
            if(user.birth_date) user.birth_date = dayjs(user.birth_date).format('YYYY-MM-DD');

            response.json(user);
        } catch(error) {
          console.log(error)
            response.status(500).send(error.message);
        }
        
    },

    update: async (request, response) => {
        try {
            const user = await User.findById(request.token.id);

            if(request.body.password) {
              delete request.body.passwordConfirm;
              const salt = await bcrypt.genSalt(10);
              user.password = await bcrypt.hash(request.body.password, salt);
            }
            else {
                for(const field in request.body){
                    user[field] = request.body[field];
                }
            }

            await user.update();
            delete user.password;
            for(const key in user) !user[key] ? delete user[key] : null;
            if(user.birth_date) user.birth_date = dayjs(user.birth_date).format('YYYY-MM-DD');
            response.json(user);

        } catch (error) {
            response.status(500).send(error.message);
        }
    },

    delete: async (request, response) => {
        try {

            let userID;
            if(request.token.role === "user") userID = request.token.id
            else if(request.token.role === "admin" && request.query.id !== 666 && request.query.id !== request.token.id) userID = request.query.id;
            else return response.status(401).send({error: "Unauthorized"})

            await Comment.setUserUnknown(userID);
            await Message.deleteByUserId(userID);
            await Booking.setUserUnknown(userID);

            const userDelete = await User.delete(userID);
            if(!userDelete) return response.status(404).send({error: `User with id ${userID} not found`});

            response.status(200).json(`User with id ${userID} deleted`);

        } catch(error) {
            response.status(500).send(error.message);
        }
    }

}

module.exports = userController;
