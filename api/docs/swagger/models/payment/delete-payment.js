module.exports = {
  // operation's method
  delete: {
    security: [{bearerAuth: []}],
    tags: ["Payment"], // operation's tag.
    description: "Delete payment{}", // operation's desc.
  }
}
