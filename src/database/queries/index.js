const connection = require('../config/connection');

const selectUser = ({username, password}) => connection.query({
  text: 'SELECT id FROM appuser WHERE name = $1 AND password = $2',
  values: [username, password],
});

module.exports = { selectUser };
