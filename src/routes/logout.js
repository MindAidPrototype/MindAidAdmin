module.exports = {
  method: 'post',
  path: '/logout',
  handler: (request, reply) => {
    console.log('logging out')
    reply('clearing cookie').state('cookie', null, {ttl: 0})
  }
}

