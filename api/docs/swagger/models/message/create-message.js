module.exports = {
  // operation's method
  post: {
    security: [{bearerAuth: []}],
    tags: ["Message"], // operation's tag
    description: "Create message {}", // short desc
   // expected params
    requestBody: {
      required:true,
      content: {
        // content-type
        "application/json": {
          schema: {
            type: "object",
            properties: {
              body: {
                type: "string"
              },
              author: {
                $ref: "#/components/schemas/_id",
              },
              subject: {
                $ref: "#/components/schemas/_id",
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
        description: "Return new Message and populate author path", // response desc.
        content: {
          // content-type
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Message",
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
        description: "Author or Subject not found",
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
