"use strict";

var Sequelize = require("sequelize");

module.exports = function(sequelize, DataTypes) {
  var Issue = sequelize.define("Issue", {
    name: Sequelize.STRING
  }, {
    tableName: 'issues',
    timestamps: false
  });
  return Issue;
};