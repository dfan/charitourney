var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  var Choice = sequelize.define("Choice", {
  }, {
    classMethods: {
        associate: function(models) {
            Choice.belongsTo(models.Charity, { as: "Vote" });
            Choice.belongsTo(models.User);
            Choice.belongsTo(models.Battle);
        }
    }
  });
  return Choice;
};
