const formidable = require('formidable')

module.exports = {
  uploadFile: (request, response, next) => {
    console.log('Michel')
    const form = formidable({multiples: true})
  
    form.parse(request, (error, fields, files) => {
      if(error) return console.log(error.message)
      request.body = fields
      let count = 0
      const fieldsName = Object.keys(files)
      for(const fieldName of fieldsName) {
       
        const fileExtension = files[fieldName].name.split('.').pop()
        if(fileExtension.match(/jpg|jpeg|png/)) {
          count++
        }
        
      }

      if(count === fieldsName.length) request.files = files
      else return response.status(500).send({error: "file extension must be jpg/jpeg/png"})

     
      next()
     
    })
  }
}





