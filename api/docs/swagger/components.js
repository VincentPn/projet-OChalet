module.exports = {
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: 'JWT'
      }
    },
    schemas: {
      // id model
      _id: {
        type: "integer",
        format: "object_id",
        description: "An psql id", // desc
        example: "45", // example of an id
      },

      Login: {
        type: "object",
        required: ["email","password"],
        properties: {
         
          password: {
            type: "string",
            format: "password",
            description: "user's clear password must have minimum 8 char, 1 lowercase, 1 uppercase, 1 integer",
            exemple: 'Test1234'
          }
        },
        description: "Login required infos",
      },


      Register: {
        type: "object",
        description: "Registration required infos",
        required: [ "lastname", "firstname", "email", "password", "passwordConfirm"],
        properties: {
          
          
          lastname:{
            type: "string",
            description: "user's lastname",
            exemple: 'fisher'
          },
          firstname:{
            type: "string",
            description: "user's firstname",
            exemple: 'bob'
          },
          email:{
            type: "string",
            format: "email",
            description: "user's used email for registration",
            exemple: 'bob@exemple.com'
          },
          password: {
            type: "string",
            format: "password",
            description: "user's clear password must have minimum 8 char, minimum 1 lowercase, minimum 1 uppercase, minimum 1 integer",
            exemple: 'Test1234'
          },
          passwordConfirm: {
            type: "string",
            format: "password",
            description: "user's clear password must have minimum 8 char, minimum 1 lowercase, minimum 1 uppercase, minimum 1 integer",
            exemple: 'Test1234'
          }
        },
      },

      User: {
        type: "object", 
        required: ["firstname","lastname","email"],
        properties: {
          _id: {
            type: "integer",
            format: "object_id",
            description: "_id", // desc
            example: "45", // example of an id,
          },
          
          firstname: {
            type: "string", // data-type
            description: "firstname", // desc
            example: "fisher", // example of a title
          },
          lastname: {
            type: "string", // data-type
            description: "lastname", // desc
            example: "bob", // example of a title
          },
          email: {
            type: "string",
            format: "email",
            description: "email", // desc
            example: "bob@exemple.com", // example of a title
          },
          password: {
            type: "string",
            format: "password",
            description: "hashed password", // desc
            example: "Mypassword123+", // example of a title
          },
         
          role: {
            type: "array<string>", // data-type
            description: "user's role", // desc
            default: "[user]",
            example: '[user]', // example of a title
          },
          
          createdAt: {
            type: "string", // data-type
            format: "date-time",
            description: "Subject creation date", // desc
            example: "2021-08-24T07:12:23.245Z", // example of a title
          },
          updatedAt: {
            type: "string", // data-type
            format: "date-time",
            description: "Subject update date", // desc
            example: "2021-08-24T07:12:23.245Z", // example of a title
          }
          
        },
      },

      offer:{
        type: "object",
        required:["title","body","zip_code","city_name","country","street_name","street_number","price","tax","main_picture","location_id"],
        properties:{
          _id: {
            type: "integer",
            format: "object_id",
            description: "Offer identification", // desc
            example: "45", // example of an id
          },
          title: {
            type: "string",
            
          },
          body: {
            type: "string",
          },
          zip_code: {
            type:"string",
          },
          city_name:{
            type:"string",
          },
          country:{
            type:"string",
          },
          street_name:{
            type:"string",
          },
          street_number:{
            type:"string",
          },
          latitude:{
            type:"string",
          },
          longitude:{
            type:"string",
          },
          price_ht:{
            type:"number",
          },
          tax:{
            type:"number",
          },
          main_picture:{
            type:"string",
            
          },
          galery_picture_1:{
            type:"string",
          },
          galery_picture_2: {
            type:"string",
          },
          galery_picture_3: {
            type:"string",
          },
          galery_picture_4: {
            type:"string",
          },
          galery_picture_5:{
            type:"string",
          },
          location_id:{
            type:"number"
          }

        },

      },

      Booking: {
        type: "object", // data type
        required:["user_id","offer_id"],
        properties: {
          _id: {
            type: "integer",
            format: "object_id",
            description: "Booking identification", // desc
            example: "45", // example of an id
          },
          user_id: {
            type: "integer",
            format: "object_id",
            description: "User identification", // desc
            example: "45", // example of an id
          },
          offer_id: {
            type: "integer", // data-type
            description: "Offer title", // desc
            example: "catman", // example of a title
          },
          
          createdAt: {
            type: "string", // data-type
            format: "date-time",
            description: "Booking creation date", // desc
            example: "2021-08-24T07:12:23.245Z", // example of a title
          },
          updatedAt: {
            type: "string", // data-type
            format: "date-time",
            description: "Booking update date", // desc
            example: "2021-08-24T07:12:23.245Z", // example of a title
          }
        },
      },

      

      Comment: {
        type: "object", // data type
        required:["body","note"],
        properties: {
          _id: {
            type: "integer", // data-type
            format: "object_id",
            description: "Comment identification", // desc
            example: "45", // example of an id
          },
          body: {
            type: "string", // data-type
            description: "Comment body", // desc
            example: "this is an exemple", // example of a title
          },
          note: {
            type: "string", // data-type
            format: "object_id",
            description: "Evaluation", // desc
            example: "4", // example of a title
          },
          user_id: {
            type: "integer", // data-type
            format:'object_id',
            description: "User id", // desc
            example: "45", // example of a title
          },
          offer_id: {
            type: "integer", // data-type
            format:'object_id',
            description: "Offer id", // desc
            example: "45",
          },
          createdAt: {
            type: "string", // data-type,
            format: "date-time",
            description: "Comment creation date", // desc
            example: "2021-08-24T07:12:23.245Z", // example of a title
          },
          updatedAt: {
            type: "string", // data-type
            format: "date-time",
            description: "Comment update date", // desc
            example: "2021-08-24T07:12:23.245Z", // example of a title
          }
        },
      },

      

      Message: {
        type: "object", // data type
        required: ["body","user_id","offer_id"],
        properties: {
          _id: {
            type: "integer", // data-type
            format: "object_id",
            description: "Comment identification", // desc
            example: "45", // example of an id
          },
          body: {
            type: "string", // data-type
            description: "Message body", // desc
            example: "this is an exemple", // example of a title
          },
          
          user_id: {
            type: "integer", // data-type
            format:'object_id',
            description: "User id", // desc
            example: "45", // example of a title
          },
          offer_id: {
            type: "integer", // data-type
            format:'object_id',
            description: "Offer id", // desc
            example: "45",
          },
          createdAt: {
            type: "string", // data-type,
            format: "date-time",
            description: "Comment creation date", // desc
            example: "2021-08-24T07:12:23.245Z", // example of a title
          },
          updatedAt: {
            type: "string", // data-type
            format: "date-time",
            description: "Comment update date", // desc
            example: "2021-08-24T07:12:23.245Z", // example of a title
          }
        },
      },
      


      
      

    
      Error: {
        type: "object", 
        properties: {
          message: {
            type: "string", 
            example: "Error message", 
          } 
        },
      },
    },
  },
  
};
