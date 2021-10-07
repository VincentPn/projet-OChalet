module.exports = {
  // operation's method
  post: {
    security: [{bearerAuth: []}],
    tags: ["Admin"], // operation's tag
    description: "Create offer {}", // short desc
   // expected params
    requestBody: {
      required:true,
      content: {
        // content-type
        "application/json": {
          schema: {
            type: "object",
            properties: {
              title: {
                type: "string"
              },
              body: {
                type: "string"
              },
              zip_code: {
                type:"string",
                
              },
              city_name: {
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
              price_ht:{
                type:"number",
              },
              tax:{
                type:"number",
              },
              main_picture:{
                type:"string",
                
              },
              location_id:{
                type:"number"
              }
            }
            
            
          },
        },
      },
    },
    // expected responses
    responses: {
      // response code
      200: {
        description: "Return new offer", // response desc.
        content: {
          // content-type
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Offer",
            },
          },
        },
      },

      401: {
        description: "Authorization missing", // response desc.
        content: {
          // content-type
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Error", // error data model
            },
          },
        },
      },
      // response code
      404: {
        description: "Offer not found or missing field",
        content: {
          // content-type
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Error", // error data model
            },
          },
        },
      },
      500: {
        description: "Server error", // response desc.
        content: {
          // content-type
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Error", // error data model
            },
          },
        },
      },
    },
  },
};
