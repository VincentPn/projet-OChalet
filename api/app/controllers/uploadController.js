const cloudinary = require('cloudinary');

cloudinary.config({ 
  cloud_name: 'dudxvl1m3', 
  api_key: '321759913749339', 
  api_secret: 'wu5YyKEkaSLWpufw7GvYf5pZNxs' 
});

const uploadController = {
    upload: async (request, response) => {
      try {
        const result = await cloudinary.v2.uploader.upload(request.body.picture);
        response.json(result);
      } catch (error) {
          response.status(500).end(error.message)
      }
    },

    delete: async (request, response) => {
      try {
        const result = await cloudinary.v2.uploader.destroy(request.body.public_id);
        response.json(result);
      } catch (error) {
        
      }
    }
}

module.exports = uploadController;
