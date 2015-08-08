var mongoose = require('mongoose');

var battleSchema = new mongoose.Schema({
	charity1: { type: mongoose.Schema.Types.ObjectId, ref: 'Charity' },
	charity2: { type: mongoose.Schema.Types.ObjectId, ref: 'Charity' },
	charity1_votes: { type: number, default: 0 },
	charity2_votes: { type: number, default: 0 }
});

module.exports = mongoose.model('Battle', battleSchema);
