const express = require('express');
const multer = require('multer');
const nanoid = require('nanoid');
const path = require('path');

const Album = require('../models/Album');

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
    Album.find().populate('artist')
      .then((results) => res.send(results))
      .catch(() => res.sendStatus(500))
  });

  router.post('/', upload.single('image'), (req, res) => {
    const albumData = req.body;

    if (req.file) {
      albumData.image = req.file.filename;
    } else {
      albumData.image = null;
    }

    const album = new Album(req.body);

    album.save()
      .then(album => res.send(album))
      .catch(error => res.status(400).send(error));
  });

  router.get('/:id', (req, res) => {
    // const id = req.params.id;
    Album
      .findOne({_id: (req.params.id)}, function (error, album) {
        if (error) res.status(404).send(error);
        if (album) res.send(album);
      })
  });
  return router;
};

module.exports = createRouter;