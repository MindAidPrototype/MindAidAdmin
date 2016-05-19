module.exports = (
  [
    {
      method: 'GET',
      path: '/',
      handler: (request, reply) => {
        reply.file('public/index.html')
      }
    },
    {
      method: 'GET',
      path: '/sayhello',
      handler: (request, reply) => {
        reply('stuff from server 2')
      }
    },
    {
      method: 'GET',
      path: '/{filename*}',
      handler: (request, reply) => {
        reply.file('public/' + request.params.filename)
      }
    }
  ]
)
