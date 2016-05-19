const Path = require('path')

module.exports = (
  [
    {
      method: 'GET',
      path: '/',
      handler: function (request, reply) {
        reply('index')
      }
    },
    {
      method: 'GET',
      path: '/refer',
      handler: function (request, reply) {
        const arrObjs = [{q: 1, text: 'fist question'}, {q: 2, text: 'second question'}]
        reply.view('refer', {objs: arrObjs})
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
