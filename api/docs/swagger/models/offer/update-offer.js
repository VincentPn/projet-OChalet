module.exports = {
  // operation's method
  patch: {
    security: [{bearerAuth: []}],
    tags: ["Offer"], // operation's tag
    description: "Update offer {}", // short desc
    parameters: [
      // expected params.
      {
        name: "_id", // name of the param
        in: "path", // location of the param
        schema: {
          $ref: "#/components/schemas/_id", // data model of the param
        },
        required: true, // Mandatory param
      },
    ],
    requestBody:{
      description: "at least one field is requiered",
      required: true,
      content:{
        "application/json":{
          schema:{
            type: "object",
            properties:{
              title: {
                type: "string",
              },
              description: {
                type: "string",
              },
              date: {
                type: "string",
                format:'date-time'
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
        description: "return updated offer ", // response desc.
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
        description: "Offer not found",
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
