var Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {

  var Tournament = sequelize.define("Tournament", {
    active: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true},
    current_round: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 1}
  }, {
    classMethods: {
      associate: function (models) {
        Tournament.hasMany(models.Charity);
        Tournament.hasMany(models.Battle);
      }
    }
  });

  return Tournament;
};