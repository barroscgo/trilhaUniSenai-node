const jwt = require('jsonwebtoken');
const SECRET = 'minha_super_senha';

function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.sendStatus(401);
  const token = authHeader.split(' ')[1];
  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

function roleMiddleware(role) {
  return (req, res, next) => {
    if (req.user && req.user.role === role) next();
    else res.status(403).send('Acesso negado.');
  }
}

module.exports = { authMiddleware, roleMiddleware, SECRET };
