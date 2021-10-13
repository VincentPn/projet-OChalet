const cloudinary = require('cloudinary');
const fs = require("fs")


cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});


module.exports = {
  cloudinaryUpload: async (request, response, next) => {
    try {
      
      const {url} = await cloudinary.v2.uploader.upload(request.body.main_picture);
      fs.unlink(request.body.main_picture, (error) => {
        if(error) throw error;
      });
      if(!url) throw new Error('Cloudinary upload error');
      console.log(url);
      request.body.main_picture = url;
      
      const optionalPictures = Object.keys(request.body)
                                     .map(key => key.includes("galery_picture") ? key : null)
                                     .filter(key => key);
                                     

      if(!optionalPictures) return next();
  
      for(const picture of optionalPictures) {
        
        const {url} = await cloudinary.v2.uploader.upload(request.body[picture]);
        fs.unlink(request.body[picture], (error) => {
          if(error) throw error;
        });
        if(!url) throw new Error('Cloudinary upload error');
        console.log(url);
        request.body[picture] = url;
    
      };

      next();
      
    } catch (error) {
        response.status(500).end(error.message);
    }
  },

  deletePicture: async (request, response, next) => {
    try {
      // url.split("/").pop().split('.').shift()
      const result = await cloudinary.v2.uploader.destroy(request.body.public_id);
      response.json(result);
    } catch (error) {
      
    }
  }
}
