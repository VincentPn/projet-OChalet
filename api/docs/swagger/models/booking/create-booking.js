module.exports = {
    // operation's method
    post: {
      security: [{bearerAuth: []}],
      tags: ["Booking"], // operation's tag
      description: "Create booking {}", // short desc
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
                description: {
                  type: "string"
                },
                date: {
                  type:"string",
                  format: "date-time"
                },
               
              }
              
              
            },
          },
        },
      },
      // expected responses
      responses: {
        // response code
        200: {
          description: "Return new booking", // response desc.
          content: {
            // content-type
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Booking",
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
          description: "Booking not found or missing field",
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
