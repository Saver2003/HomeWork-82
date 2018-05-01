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

const createRouter = (db) => {
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
      .catch(error => res.status(400).send(error))

  });

  router.get('/:id', (req, res) => {
    db.collections('albums')
      .findOne({_id: new ObjectId(req.params.id)})
      .then(result => {
        if (result) res.send(result);
        else res.sendStatus(404);
      })
      .catch(() => res.sendStatus(500))
  });
  return router;
};

module.exports = createRouter;