const session = require('express-session');
module.exports = session({
  secret: 'super_secreto',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
});
