var Tournament = require('../models/Tournament');
var braintree = require("braintree");
var secrets = require("../config/secrets");

var braintreeGateway = braintree.connect({
  environment:  braintree.Environment.Sandbox,
  merchantId:   secrets.braintree.merchantId,
  publicKey:    secrets.braintree.publicKey,
  privateKey:   secrets.braintree.privateKey
});


// PARAM :user
exports.tournamentParam = function(req, res, next, id) {
  Tournament.findById(id, function(err, tournament) {
    if (err) console.error(err);

    req.tournament = tournament;
    next();
  })
};

// GET /tournaments/join
// redirect to current tournament's join page
exports.joinLatestTournament = function(req, res) {
  Tournament.findOne({ active: true }, function(err, tournament) {
    res.redirect('/tournaments/'+tournament.id+'/join');
  });
};

// GET /tournaments/:tournament/join
exports.joinTournamentById = function(req, res) {
  braintreeGateway.clientToken.generate({}, function (err, btRes) {
    res.render('tournaments/join', {
      tournament: req.tournament,
      clientToken: btRes.clientToken
    });
  });
};

// POST /tournaments/:tournament/join
exports.postTournamentJoin = function(req, res) {
  var nonce = req.body.payment_method_nonce;

  braintreeGateway.transaction.sale({
    amount: req.body.payment_amount,
    paymentMethodNonce: nonce,
  }, function (err, btRes) {
    res.redirect('/tournaments/' + tournament.id);
    console.dir(btRes);
  });
}