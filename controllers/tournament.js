var async = require('async');
var models = require('../models');
var Tournament = models.Tournament;
var User = models.User;
var Battle = models.Battle;
var Charity = models.Charity;
var Choice = models.Choice;
var braintree = require("braintree");
var secrets = require("../config/secrets");
var _ = require('lodash');

var braintreeGateway = braintree.connect({
  environment:  braintree.Environment.Sandbox,
  merchantId:   secrets.braintree.merchantId,
  publicKey:    secrets.braintree.publicKey,
  privateKey:   secrets.braintree.privateKey
});

// GET /tournament/
exports.getIndex = function(req, res) {
  Tournament.findOne({where: {active: true}, include: [{model: Battle, include:[Choice, {model: Charity, as: 'Charity1'}, {model: Charity, as: 'Charity2'}]}]}).then(function(tournament) {
    User.findAll().then(function(users) {
      var totalContrib = _.reduce(users, function(sum, user) {
        return sum + user.contribution;
      }, 0);

      var battles = tournament.Battles;
      for (var i=0; i < battles.length; i++){
        var choices = battles[i].Choices;
        battles[i].voted = false;
        battles[i].charity_id = 0;
        for (var j = 0; j < choices.length; j++){
          if (choices[j].UserId == req.user.id){
            battles[i].voted = true;
            battles[i].charity_id = choices[j].CharityId;
            console.log('!!!');
            console.log(choices[j].CharityId);
          }
        }
      }

      res.render('tournament/index', {
        title: 'Tournament',
        totalContributions: totalContrib,
        battles: battles
      });
    })
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

// POST /tournaments/join
exports.postTournamentJoin = function(req, res) {
  var amount = req.body.payment_amount;
  var nonce = req.body.payment_method_nonce;

  async.series([
    function(done) {
      braintreeGateway.transaction.sale({
        amount: amount,
        paymentMethodNonce: nonce,
      }, function(err, btRes) {
        if (err) console.log(err);
        done(null, btRes);
      });
    }, function(done) {
      req.user.updateAttributes({
        contribution: parseFloat(amount)
      }).then(function() {
        done(null, req.user);
      });
    }
  ], function (err, results) {
    req.flash('info', { msg: 'Successfully joined tournament with a $'+amount+' contribution.' });
    res.redirect('/tournament/');
  });
};