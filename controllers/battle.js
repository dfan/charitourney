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
  var tournament = Tournament.findOne({where: {active: true}}).then(function(tournament){
    Tournament.findOne({where: {active: true}, include: [{model: Battle, include:[{model: Choice}, {model: Charity, as: 'Charity1'}, {model: Charity, as: 'Charity2'}]}]})
    .then(function(tournament) {
      var battles = tournament.Battles;
      for (var i=0; i < battles.length; i++){
        var choices = battles[i].Choices;
        battles[i].voted = false;
        for (var j; j < choices.length; j++){
          if (choices[j].User.id == req.user.id){
            battles[i].voted = true;
          }
        }
      }

      for (var k=0; k < battles.length; i++){
        if (battles[k].voted !== true && battles[k].round == tournament.current_round){
          res.render('battle', {
            title: 'Battle!',
            battle: battles[k]
          });
          return null;
        }
      }
      res.redirect('/tournament');
    });
  });
};


exports.post_battle = function(req, res) {
	// Save Battle Data
  battle_id = req.body.battle_id;
  charity_id = req.body.charity_id;

  Battle.findOne({id: battle_id}).then(function(battle){
    Charity.findOne({id: charity_id}).then(function(charity){

      var choice = Choice.build({});
      choice.save().then(function(){
        choice.setBattle(battle);
        choice.setCharity(charity);
        res.redirect('/battle');
      });
    });
  });
};