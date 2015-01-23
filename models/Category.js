"use strict";

var Sequelize = require("sequelize");

module.exports = function(sequelize, DataTypes) {
  var Category = sequelize.define("Category", {
    name: Sequelize.STRING
  }, {
    tableName: 'categories',
    timestamps: false
  });
  return Category;
};