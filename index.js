const server = require('./api/server.js');

const PORT = process.env.PORT || 3300;
const serverHere = server.listen(PORT, () => {
  console.log(`\n=== Server listening on port ${PORT} ===\n`);
});

module.exports = serverHere