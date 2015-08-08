"use strict";

var Sequelize = require('sequelize');
var User = require('User');
var Charity = require('Charity');

module.exports = function(sequelize, DataTypes) {
  var Charity = sequelize.define("Charity", {
    user: {
	type: Sequelize.INTEGER,
	   references: {
	     model: User,
	     key: 'id',
	     deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
	   }
	},
	charity: {
	type: Sequelize.INTEGER,
	   references: {
	     model: Charity,
	     key: 'id',
	     deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
	   }
	}
  });
  return Charity;
};
