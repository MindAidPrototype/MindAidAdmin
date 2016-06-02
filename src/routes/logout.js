module.exports = {
  method: 'get',
  path: '/logout',
  handler: (request, reply) => {
    reply.redirect('/login').state('cookie', null, {ttl: 0})
  }
}
