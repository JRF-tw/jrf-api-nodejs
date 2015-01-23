"use strict";

var Sequelize = require("sequelize");

module.exports = function(sequelize, DataTypes) {
  var Datum = sequelize.define("Datum", {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        identifier: {
          type: DataTypes.STRING,
          index: true
        },
        sensitive: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
          allowNull: false
        },
        title: DataTypes.STRING,
        contributor: DataTypes.STRING,
        publisher: DataTypes.STRING,
        date: DataTypes.DATE,
        unit: DataTypes.STRING,
        size: DataTypes.STRING,
        page: DataTypes.STRING,
        quantity: DataTypes.STRING,
        subject: DataTypes.STRING,
        catalog: DataTypes.TEXT,
        information: DataTypes.STRING,
        comment: DataTypes.TEXT,
        copyright: DataTypes.STRING,
        rightInRem: DataTypes.STRING,
        ownership: DataTypes.STRING,
        published: {
          type: DataTypes.BOOLEAN,
          defaultValue: true,
          allowNull: false
        },
        licence: DataTypes.STRING,
        filename: DataTypes.STRING,
        filetype: DataTypes.STRING,
        creator: DataTypes.STRING,
        createdAt: DataTypes.DATE,
        commentor: DataTypes.STRING,
        commentedAt: DataTypes.DATE,
        modifier: DataTypes.STRING,
        modifiedAt: DataTypes.DATE
      }, {
    tableName: 'data',
    timestamps: false
  });
  return Datum;
};

