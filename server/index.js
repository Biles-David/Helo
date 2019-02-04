require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session');
const { json } = require('body-parser');
const path = require('path');
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;
const port = SERVER_PORT

const { login, register, getSession } = require('./controller/userCtrl');
const { getPosts, getQueryPosts } = require('./controller/postCtrl')

const app = express()

app.use(json())
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7
  }
}));

massive(CONNECTION_STRING)
.then(db => app.set('db', db))
.catch(err => console.log(err));

app.post('/user/login', login);
app.post('/user/register', register);
app.get('/user/session', getSession);
app.get('/posts/all', getPosts)
app.get('/posts/post', getQueryPosts)

app.listen(port, () => console.log(`Listening on port ${port}`))