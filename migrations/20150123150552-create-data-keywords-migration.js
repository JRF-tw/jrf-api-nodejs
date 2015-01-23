"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    // add altering commands here, calling 'done' when finished
    migration.createTable(
      'data_keywords',
      {
        DatumId: DataTypes.INTEGER,
        KeywordId: DataTypes.INTEGER
      },
      {
        charset: 'UTF-8' // default: null
      }
    );
    done();
  },

  down: function(migration, DataTypes, done) {
    migration.dropTable('data_keywords');
    done();
  }
};
