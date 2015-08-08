var mongoose = require('mongoose');

var tournamentSchema = new mongoose.Schema({
  name: { type: String, default: '' },
  charities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Charity' }],
  battles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Battle'}]
});

module.exports = mongoose.model('Tournament', tournamentSchema);
