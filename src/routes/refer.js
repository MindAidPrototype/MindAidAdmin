module.exports = {
  method: 'GET',
  path: '/refer',
  handler: (request, reply) => {
    reply.view('refer') 
  }
}
