"use strict";

var Sequelize = require("sequelize");

module.exports = function(sequelize, DataTypes) {
  var DatumKeyword = sequelize.define("DatumKeyword", {
    DatumId: DataTypes.INTEGER,
    KeywordId: DataTypes.INTEGER
  }, {
    tableName: 'data_keywords',
    timestamps: false
  });
  return DatumKeyword;
};