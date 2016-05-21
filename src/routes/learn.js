module.exports = {
  method: 'GET',
  path: '/learn',
  handler: (request, reply) => {
    reply.view('learn') 
  }
}
