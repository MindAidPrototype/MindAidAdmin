module.exports = {
  method: 'GET',
  path: '/listen',
  handler: (request, reply) => {
    reply.view('listen') 
  }
}
