module.exports = {
  // operation's method
  patch: {
    security: [{bearerAuth: []}],
    tags: ["Admin"], // operation's tag
    description: "Update logged admin, admin ID is send automaticly through token in request headers {}", // short desc

    requestBody:{
      description: "at least one field is requiered",
      required: true,
      content:{
        "application/json":{
          schema:{
            type: "object",
            properties:{
              pseudo: {
                type: "string",
              },
              lastname: {
                type: "string",
              },
              firstname: {
                type: "string",
              },
              email: {
                type: "string",
                format:"email",
              },
              picture: {
                type: "string",
              },
            }
          }
        }
      }
    },
    // expected responses
    responses: {
      // response code
      200: {
        description: "Return updated admin without password field and populate subject field", // response desc.
        content: {
          // content-type
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Admin",
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
        description: "User not found",
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
