const Path = require('path')

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
      path: '/refer',
      handler: function (request, reply) {
        reply.view('refer')
      }
    },
    {
      method: 'GET',
      path: '/public/{param*}',
      handler: {
        directory: {
          path: Path.join(__dirname, '/../public')
        }
      }
    }
    
  ]
)
