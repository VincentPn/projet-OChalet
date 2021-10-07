const cloudinary = require('cloudinary');


cloudinary.config({ 
  cloud_name: 'dudxvl1m3', 
  api_key: '321759913749339', 
  api_secret: 'wu5YyKEkaSLWpufw7GvYf5pZNxs' 
});


module.exports = {
  cloudinaryUpload: async (request, response, next) => {
    try {
      
      console.log('nous sommes dans cloudinary')
      
      const {url} = await cloudinary.v2.uploader.upload(request.files.main_picture.path);
      if(!url) throw new Error('Cloudinary upload error')
      console.log(url)
      request.body.main_picture = url
     
      
      const optionalPictures = Object.keys(request.files)
                                     .map(key => key.includes("galery_picture") ? key : null)
                                     .filter(key => key)
                                     .filter(key => Object.keys(key).length)
      if(!optionalPictures) return next()

      console.log(optionalPictures)
  
      for(const picture of optionalPictures) {
        
        const {url} = await cloudinary.v2.uploader.upload(request.files[picture].path);
        if(!url) throw new Error('Cloudinary upload error')
        console.log(url)
        request.body[picture] = url
    
      }

      next()
      
    } catch (error) {
        response.status(500).end(error.message)
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
