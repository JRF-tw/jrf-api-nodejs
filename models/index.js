"use strict";

var env       = process.env.NODE_ENV || "development";
var config    = require(__dirname + '/../config/config.json')[env];
var Carrier, Category, Collector, Issue, Keyword, Language, Pattern, Record;
var models = {}

var knex = require('knex')({
  client: 'pg',
  connection: {
    host     : '127.0.0.1',
    user     : config.username,
    password : config.password,
    database : config.database,
    charset  : 'utf8'
  }
});

var bookshelf = require('bookshelf')(knex);

var Carrier = bookshelf.Model.extend({
  tableName: 'carriers',
  records: function (){
    return this.hasMany(Record);
  }
});

var Category = bookshelf.Model.extend({
  tableName: 'categories',
  records: function (){
    return this.hasMany(Record);
  }
});
var Collector = bookshelf.Model.extend({
  tableName: 'collectors',
  records: function (){
    return this.hasMany(Record);
  }
});
var Issue = bookshelf.Model.extend({
  tableName: 'issues',
  records: function (){
    return this.hasMany(Record);
  }
});
var Keyword = bookshelf.Model.extend({
  tableName: 'keywords',
  records: function (){
    return this.belongsToMany(Record);
  }
});
var Language = bookshelf.Model.extend({
  tableName: 'languages',
  records: function (){
    return this.hasMany(Record);
  }
});
var Pattern = bookshelf.Model.extend({
  tableName: 'patterns',
  records: function (){
    return this.hasMany(Record);
  }
});
var Record = bookshelf.Model.extend({
  tableName: 'records',
  category: function (){
    return this.belongsTo(Category);
  },
  carrier: function (){
    return this.belongsTo(Carrier);
  },
  collector: function (){
    return this.belongsTo(Collector);
  },
  issue: function (){
    return this.belongsTo(Issue);
  },
  language: function (){
    return this.belongsTo(Language);
  },
  pattern: function (){
    return this.belongsTo(Pattern);
  },
  keywords: function (){
    return this.belongsToMany(Keyword);
  },
});

module.exports = {
  Carrier: Carrier,
  Category: Category,
  Collector: Collector,
  Issue: Issue,
  Keyword: Keyword,
  Language: Language,
  Pattern: Pattern,
  Record: Record,
  knex: knex
}
