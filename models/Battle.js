"use strict";

var Sequelize = require('sequelize');
var Tournament = require('./Tournament');
var Charity = require('./Charity');


module.exports = function(sequelize, DataTypes) {
  var Battle = sequelize.define("Charity", {
    round: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 1},
	tournament: {
	type: Sequelize.INTEGER,
	   references: {
	     model: Tournament,
	     key: 'id',
	     deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
	   }
	},
	charity1: {
	type: Sequelize.INTEGER,
	   references: {
	     model: Charity,
	     key: 'id',
	     deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
	   }
	},
	charity2: {
	type: Sequelize.INTEGER,
	   references: {
	     model: Charity,
	     key: 'id',
	     deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
	   }
	}
  });
  return Battle;
};