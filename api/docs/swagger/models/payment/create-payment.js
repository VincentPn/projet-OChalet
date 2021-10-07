module.exports = {
  // operation's method
  post: {
    security: [{bearerAuth: []}],
    tags: ["Payment"], // operation's tag
    description: "Create Payment {}", // short desc
  }
}
