module.exports = (Cookie) => ({
  method: 'GET',
  path: '/about/',
  handler: (request, reply) => {
    request.state.cookie === Cookie ?
      reply.view('about', {
        about: {
          title: 'Mind Aid',
          body: [
            {
              subtitle: 'What',
              paragraphs: ['about mindaid']
            },
            {
              subtitle: 'Why',
              paragraphs: ['why mindaid']
            }
          ]
        }
      }) :
        reply.redirect('/login')
  }
},
{
  method: 'POST',
  path: '/about/{type}',
  handler: (request, reply) => {
    request.state.cookie === Cookie ?
     :
        reply.redirect('/login')
  }
})
