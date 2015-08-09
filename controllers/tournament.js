var async = require('async');
var models = require('../models');
var Tournament = models.Tournament;
var braintree = require("braintree");
var secrets = require("../config/secrets");

var braintreeGateway = braintree.connect({
  environment:  braintree.Environment.Sandbox,
  merchantId:   secrets.braintree.merchantId,
  publicKey:    secrets.braintree.publicKey,
  privateKey:   secrets.braintree.privateKey
});

// GET /tournament/
exports.getIndex = function(req, res) {
  res.render('tournament/index', {
    title: 'Tournament'
  });
};

// GET /tournament/join
// redirect to current tournament's join page
exports.getTournamentJoin = function(req, res) {
  braintreeGateway.clientToken.generate({}, function(err, btRes) {
    res.render('tournament/join', {
       title: 'Join Current Tournament',
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
    res.redirect('/tournament/');
    console.dir(btRes);
  });
};