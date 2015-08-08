"use strict";

var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  var Tournament = sequelize.define("Charity", {
    active: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true},
  	current_rount: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 1}
  });
  return Tournament;
};