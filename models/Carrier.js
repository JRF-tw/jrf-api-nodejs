"use strict";

var Sequelize = require("sequelize");

module.exports = function(sequelize, DataTypes) {
  var Carrier = sequelize.define("Carrier", {
    name: Sequelize.STRING
  }, {
    tableName: 'carriers',
    timestamps: false
  });
  return Carrier;
};