const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');

const albums = require('./app/albums');
const artists = require('./app/artists');
const tracks = require('./app/tracks');

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


  app.listen(port, () => {
    console.log(`Server started on ${port} port!`);
  })
});

