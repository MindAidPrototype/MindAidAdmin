module.exports = (Cookie) => ({
  method: 'GET',
  path: '/learn',
  handler: (request, reply) => {
    request.state.cookie === Cookie ?
      reply.view('learn') :
        reply.redirect('/login')
  }
})
