module.exports = {
  method: 'GET',
  path: '/about',
  handler: (request, reply) => {
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
    })
  }
}
