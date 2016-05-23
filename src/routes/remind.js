module.exports = (Cookie) => ({
  method: 'GET',
  path: '/remind',
  handler: (request, reply) => {
    request.state.cookie === Cookie ?
      reply.view('remind') :
        reply.redirect('/login')
  }
})
