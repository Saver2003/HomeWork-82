const express = require('express');
const Track = require('../models/Track');

const createRouter = () => {
  const router = express.Router();

  router.get('/', (req, res) => {
    Track.find()
      .then(tracks => res.send(tracks))
      .catch(() => res.sendStatus(500))
  });

  router.post('/', (req, res) => {
    // const artistData = req.body;



    const track = new Track(req.body);

    track.save()
      .then(track => res.send(track))
      .catch(error => res.status(400).send(error))
  });

  return router;
};

module.exports = createRouter;