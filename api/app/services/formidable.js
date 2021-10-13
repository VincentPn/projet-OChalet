const formidable = require('formidable')
const path = require('path')

module.exports = (request, response, next) => {

    try {
      const form = formidable({multiples: true, uploadDir: path.join(__dirname, "../", "uploads") });
  
      form.parse(request, (error, fields, files) => {
        if(error) throw error;
       
        for(const file in files){
          const fileExtension = files[file].name.split('.').pop();
          if(!fileExtension.match(/jpg|jpeg|png/)) throw new Error("file must be a picture");
        }
        
        for(const field in fields) request.body[field] = fields[field];
        for(const file in files) request.body[file] = files[file].path;
        next();
      });
    } catch (error) {
      response.status(500).send({error: error.message});
    }
};





