var models  = require('../models');
var Choice = models.Choice;
var Battle = models.Battle;
var Tournament = models.Tournament;
var User = models.User;


/**
 * GET /
 * Battle page.
 */
exports.get_battle = function(req, res) {

  var tournament = Tournament.findOne({where: {active: true}}).then(function(tournament){

    Tournament.findOne({where: {active: true}, include: [{model: Battle, include:[{model: Choice}]}]})
    .then(function(tournament) {
      console.log(tournament);

      var battles = tournament.Battles;

      for (var i; i < battles.length; i++){
        var choices = battles[i].Choices;
        battle[i].voted = false;
        for (var j; j < choices.length; j++){
          if (choice.User.id == req.user.id){
            battle[i].voted = true;
          }
        }
      }

      for (var k; k < battles.length; i++){
        if (battle[k].voted === false && battle[k].round == tournament.current_round){
          res.render('battle', {
            title: 'Battle!',
            battle: battle[k]
          });
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

      var choice = Choice.build({
        battle: battle_id
      });
      choice.save().then(function(){
        res.redirect('/battle');
      });
    });
  });
};