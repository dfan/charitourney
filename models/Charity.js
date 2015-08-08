var mongoose = require('mongoose');

var chairtySchema = new mongoose.Schema({
  name: { type: String, default: '' },
  total_points: { type: Number, default: 0 }
});

module.exports = mongoose.model('Chairity', chairtySchema);
