const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');

const albums = require('./app/albums');
const artists = require('./app/artists');
const tracks = require('./app/tracks');
const users = require('./app/users');
const track_history = require('./app/track_history');

const app = express();

const port = 8000;

app.use(express.json());
app.use(express.static('public'));

mongoose.connect(config.db.url + '/' + config.db.name);

const db = mongoose.connection;

db.once('open', () => {
  console.log('Mongoose connected!');

  app.use('/albums', albums());
  app.use('/artists', artists());
  app.use('/tracks', tracks());
  app.use('/users', users());
  app.use('/track_history', track_history());


  app.listen(port, () => {
    console.log(`Server started on ${port} port!`);
  })
});

