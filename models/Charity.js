var Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {
  var Charity = sequelize.define("Charity", {
    name: { type: Sequelize.STRING, allowNull: false},
    image: { type: Sequelize.STRING, allowNull: false},
    description: { type: Sequelize.STRING, allowNull: false}
  }, {
    classMethods: {
      associate: function(models) {
      }
    }
  });

  return Charity;
};