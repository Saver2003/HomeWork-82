const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  information: {
    type: String,
    required: true
  },
  photo: {
    type: String,
    required: true
  }
});

const Artist = mongoose.model('Artist', ArtistSchema);

module.exports = Artist;