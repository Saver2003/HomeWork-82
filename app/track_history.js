const express = require('express');
const TrackHistory = require('../models/TrackHistory');
const User = require('../models/User');

const createRouter = () => {
  const router = express.Router();

  router.post('/', async (req, res) => {
    const token = req.get('Token');

    const user = await User.findOne({token});
    if (!user) {
      res.status(401).send({error: 'user not authorised!'})
    } else {
      const track = {user: user._id, track: req.body.track, dateTime: new Date()};
      const track_history = new TrackHistory(track);
      track_history.save()
        .then(track_history => res.send(track_history))
        .catch(error => res.status(400).send(error));
    }
  });

  return router;
};

module.exports = createRouter;
