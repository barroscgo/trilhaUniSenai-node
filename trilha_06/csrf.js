const csrf = require('csurf');

function csrfSetup(app) {
  
  app.use(['/form', '/processa'], csrf({ cookie: true }));
}

module.exports = csrfSetup;
