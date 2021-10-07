module.exports = {
  // operation's method
  patch: {
    security: [{bearerAuth: []}],
    tags: ["Payment"], // operation's tag
    description: "Update payment {}", // short desc
  }

}
