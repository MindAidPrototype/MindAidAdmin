module.exports = {
  method: 'post',
  path: '/logout',
  handler: (request, reply) => {
    reply('clearing cookie').state('cookie', null, {ttl: 0})
  }
}

