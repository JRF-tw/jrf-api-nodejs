"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    // add altering commands here, calling 'done' when finished
    migration.createTable(
      'patterns',
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        createdAt: {
          type: DataTypes.DATE
        },
        updatedAt: {
          type: DataTypes.DATE
        },
        name: {
          type: DataTypes.STRING,
          unique: true
        }
      },
      {
        charset: 'UTF-8' // default: null
      }
    );
    done();
  },

  down: function(migration, DataTypes, done) {
    migration.dropTable('pattern');
    done();
  }
};
