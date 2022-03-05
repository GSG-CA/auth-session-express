require('dotenv').config();

const { join } = require('path');
const express = require('express')
const session = require('express-session')
const cookieParser = require("cookie-parser");
const pgSession = require('connect-pg-simple')(session);

const pgPool = require('./database/config/connection');
const { selectUser } = require('./database/queries');

const app = express()

const oneDay = 1000 * 60 * 60 * 24;

app.set('PORT', process.env.PORT || 8000);

app.use(cookieParser());
app.use(session({
  store: new pgSession({
    pool: pgPool,                // Connection pool
    tableName: 'session'   // Use another table-name than the default "session" one
    // Insert connect-pg-simple options here
  }),
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: oneDay }
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//serving public file
app.use(express.static(join(__dirname, '..', 'public')));

app.get('/', (req, res) => {
  if (req.session.userID) {
    res.send("Welcome User <a href=\'/logout'>click to logout</a>");
  } else
    res.sendFile(join(__dirname, '..', 'public', 'login.html'))
});

app.post('/user', (req, res) => {
  const { username, password } = req.body;

  selectUser({ username, password }).then(({ rowCount, rows }) => {
    if (rowCount) {
      req.session.userID = rows[0].id;
      res.send(`Hey there, welcome <a href=\'/logout'>click to logout</a>`);
    }
    else {
      res.send('Invalid username or password');
    }
  }
  )
});

app.get('/auth', (req, res) => {
  res.json({ msg: 'HI USER' });
});

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = app;
