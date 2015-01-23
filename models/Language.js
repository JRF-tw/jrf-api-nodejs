"use strict";

var Sequelize = require("sequelize");

module.exports = function(sequelize, DataTypes) {
  var Language = sequelize.define("Language", {
    name: Sequelize.STRING
  }, {
    tableName: 'languages',
    timestamps: false
  });
  return Language;
};