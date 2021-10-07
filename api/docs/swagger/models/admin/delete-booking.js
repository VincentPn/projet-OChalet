module.exports = {
  // operation's method.
  delete: {
    security: [{bearerAuth: []}],
    tags: ["Admin"], // operation's tag
    description: "Delete booking", // short desc
    parameters: [
      // expected parameters
      {
        name: "_id", // name of param
        in: "path", // location of param
        schema: {
          $ref: "#/components/schemas/_id", // id model
        },
        required: true, // mandatory
      },
    ],
    // expected responses
    responses: {
      // response code
      200: {
        description: "Booking is deleted", // response desc.
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
        description: "Booking not found",
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
