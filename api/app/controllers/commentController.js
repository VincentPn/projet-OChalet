const {Comment} = require('../models');

const commentController = {

    findByUserId: async (request, response) => {
        try {
            const comment = await Comment.findByUserId(parseInt(request.token.id, 10));
            response.json(comment);
        } catch(error) {
            response.status(500).send(error.message);
        }
    },

    findByOfferId: async (request, response) => {
        
        const comments = await Comment.findByOfferId(request.query.id);
        response.json(comments);

    },

    create: async (request, response) => {
        try {
        
        request.body.user_id = request.token.id
        const newComment = new Comment(request.body).create()
        response.status(201).json(newComment);

        } catch (error) {
            response.status(500).send(error.message);
        }
    },

    delete: async (request, response) => {
        try {
            
            const commentID = request.query.id;
            
            const comment = await Comment.findById(commentID)
            
            if(!comment) return response.status(404).send("not found")
            const {id, role} = request.token

            if(role === "admin") {
                await Comment.delete(commentID)
                return response.status(200).json(`Comment with id ${commentID} deleted`);
            }
            else if(id === comment.user_id) {
                await Comment.delete(commentID);
                return response.status(200).json(`Comment with id ${commentID} deleted`);
            }
            else return response.status(401).send("Unauthorized")
            
            
        } catch(error) {
            response.status(500).send(error.message);
        }
    }

}

module.exports = commentController;
