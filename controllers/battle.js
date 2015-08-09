var models  = require('../models');
var Choice = models.Choice;
var Battle = models.Battle;
var Tournament = models.Tournament;
var User = models.User;
var Charity = models.Charity;


/**
 * GET /
 * Battle page.
 */
exports.get_battle = function(req, res) {

  if (req.user == null || req.user.contribution == 0){
    res.redirect('/tournament/join');
  }

  var tournament = Tournament.findOne({where: {active: true}}).then(function(tournament){
    Tournament.findOne({where: {active: true}, include: [{model: Battle, include:[Choice, {model: Charity, as: 'Charity1'}, {model: Charity, as: 'Charity2'}]}]})
    .then(function(tournament) {
      var battles = tournament.Battles;
      for (var i=0; i < battles.length; i++){
        var choices = battles[i].Choices;
        battles[i].voted = false;
        for (var j = 0; j < choices.length; j++){
          if (choices[j].UserId == req.user.id){
            battles[i].voted = true;
          }
        }
      }

      for (var k=0; k < battles.length; k++){
        if (battles[k].voted !== true && battles[k].round == tournament.current_round){
          res.render('battle', {
            title: 'Battle!',
            battle: battles[k]
          });
          return null;
        }
      }

      req.user.battles_done = true;
      req.user.save().then(function(){
        req.flash('info', { msg: 'Already did all the battles. Sorry!' });
        res.redirect('/tournament');
        console.log('redirected;');
    });
  });
});


exports.post_battle = function(req, res) {
	// Save Battle Data
  battle_id = parseInt(req.body.battle_id);
  charity_id = parseInt(req.body.charity_id);

  console.log(req.body);

  Battle.findOne({where: {id: battle_id}}).then(function(battle){
    Charity.findOne({ where: {id: charity_id}}).then(function(charity){

      var choice = Choice.build({});
      choice.save().then(function(){
        choice.setBattle(battle);
        choice.setCharity(charity);
        choice.setUser(req.user);
        res.redirect('/battle');
      });
    });
  });
};