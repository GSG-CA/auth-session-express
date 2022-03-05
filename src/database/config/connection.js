require('dotenv').config();

const { Pool } = require('pg');

const { NODE_ENV, TEST_DB_URL, DATABASE_URL, DB_URL } = process.env;

let dbUrl = '';

if (NODE_ENV === 'test') {
  dbUrl = TEST_DB_URL;
} else if (NODE_ENV === 'production') {
  dbUrl = DATABASE_URL;
} else {
  dbUrl = DB_URL;
}

if (!dbUrl) throw new Error('No Database FOUND');

const options = {
  connectionString: dbUrl,
};

module.exports = new Pool(options);
