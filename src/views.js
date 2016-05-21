const handlebars = require('handlebars')

module.exports = {
  engines: { html: handlebars },
  relativeTo: __dirname + '/../',
  path: './views',
  layoutPath: './views/layout',
  layout: 'default',
  // partialsPath: './views/partials/'
}
