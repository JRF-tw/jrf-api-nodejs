"use strict";

var Sequelize = require("sequelize");

module.exports = function(sequelize, DataTypes) {
  var Keyword = sequelize.define("Keyword", {
    name: Sequelize.STRING
  }, {
    tableName: 'keywords',
    timestamps: false
  });
  return Keyword;
};