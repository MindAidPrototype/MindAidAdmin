module.exports = (Cookie) => ({
  method: 'GET',
  path: '/about',
  handler: (request, reply) => {
    request.state.cookie === Cookie ?
      reply.view('about', {
        about: {
          title: 'Mind Aid',
          body: [
            {
              subtitle: 'What',
              paragraph: 'about mindaid'
            },
            {
              subtitle: 'Why',
              paragraph: 'why mindaid'
            }
          ]
        }
      }) :
        reply.redirect('/login')
  }
})
