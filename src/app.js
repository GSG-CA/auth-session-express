const express = require('express')
const session = require('express-session')

const app = express()

app.set('PORT', process.env.PORT || 8000);

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

module.exports = app;
