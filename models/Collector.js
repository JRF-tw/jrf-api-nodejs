"use strict";

var Sequelize = require("sequelize");

module.exports = function(sequelize, DataTypes) {
  var Collector = sequelize.define("Collector", {
    name: Sequelize.STRING
  }, {
    tableName: 'collectors',
    timestamps: false
  });
  return Collector;
};