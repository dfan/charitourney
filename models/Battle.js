var mongoose = require('mongoose');

var battleSchema = new mongoose.Schema({
	charity1: { type: mongoose.Schema.Types.ObjectId, ref: 'Charity' },
	charity2: { type: mongoose.Schema.Types.ObjectId, ref: 'Charity' },
	choices: [{
		user_id: String,
		choice: Number
	}]
});

module.exports = mongoose.model('Battle', battleSchema);
