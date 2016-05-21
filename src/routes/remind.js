module.exports = {
  method: 'GET',
  path: '/remind',
  handler: (request, reply) => {
    reply.view('remind') 
  }
}
