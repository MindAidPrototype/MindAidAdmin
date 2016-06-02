module.exports = (Cookie) => ({
  method: 'GET',
  path: '/newUser',
  handler: (request, reply) => {
    request.state.cookie === Cookie ?
    reply.view('newUser') : reply.redirect('/login')
  }
})
