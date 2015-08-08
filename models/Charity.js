var mongoose = require('mongoose');

var chairySchema = new mongoose.Schema({
  name: { type: String, default: '' },
  points: { type: Number, default: o },
});

module.exports = mongoose.model('Chairity', chairySchema);
