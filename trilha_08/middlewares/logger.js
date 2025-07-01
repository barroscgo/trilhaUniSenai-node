const fs = require('fs');
const path = require('path');

module.exports = (req, res, next) => {
  const log = `${new Date().toISOString()} ${req.method} ${req.url}\n`;
  fs.appendFileSync(path.join(__dirname, '../access.log'), log);
  next();
};
