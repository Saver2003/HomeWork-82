const express = require('express');
const multer = require('multer');
const nanoid = require('nanoid');
const path = require('path');

const Artist = require('../models/Artist');

const config = require('../config');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, nanoid() + path.extname(file.originalname));
  }
});

const upload = multer({storage});

const router = express.Router();

const createRouter = () => {
  router.get('/', (req, res) => {
    Artist.find()
      .then(artists => res.send(artists))
      .catch(() => res.sendStatus(500))
  });

  router.post('/', upload.single('photo'), (req, res) => {
    const artistData = req.body;

    if (req.file) {
      artistData.photo = req.file.filename;
    } else {
      artistData.photo = null;
    }

    const artist = new Artist(req.body);

    artist.save()
      .then(artist => res.send(artist))
      .catch(error => res.status(400).send(error))
  });

  return router;
};

module.exports = createRouter;

