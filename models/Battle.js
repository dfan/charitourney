var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  var Battle = sequelize.define("Battle", {
    round: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 1}
  }, {
    classMethods: {
      associate: function(models) {
        Battle.hasOne(models.Tournament);
        Battle.hasOne(models.Charity, { as: 'Charity1' });
        Battle.hasOne(models.Charity, { as: 'Charity2' });
      }
    }
  });
  return Battle;
};