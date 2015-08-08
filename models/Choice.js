var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  var Choice = sequelize.define("Choice", {
  }, {
    classMethods: {
        associate: function(models) {
            Choice.hasOne(models.Charity, { as: "Vote" });
            Choice.belongsTo(models.User);
        }
    }
  });
  return Choice;
};
