"use strict";

var Sequelize = require("sequelize");

module.exports = function(sequelize, DataTypes) {
  var Pattern = sequelize.define("Pattern", {
    name: Sequelize.STRING
  }, {
    tableName: 'patterns',
    timestamps: false
  });
  return Pattern;
};