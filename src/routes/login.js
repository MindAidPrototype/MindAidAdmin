module.exports = (Cookie) => ({
  method: 'GET',
  path: '/login',
  handler: (request, reply) => {
    request.state.cookie === Cookie ?
      reply.redirect('/') :
        reply.view('login', null, {layout: 'login'})
  }
})

