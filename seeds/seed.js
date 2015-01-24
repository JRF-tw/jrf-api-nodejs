'use strict';
var lazy = require("lazy");
var fs = require("fs");
var models = require("../models");
var Promise = require('bluebird');

exports.seed = function(knex, Promise) {
  models.knex.raw('DELETE FROM keywords_records; DELETE FROM records;')
  .then(function(){
    new lazy(fs.createReadStream('./seeds/data/data.json'))
      .lines
      .forEach(function(line){
        var record_line = JSON.parse(line);
        console.log(record_line);
        models.Record.forge({
          identifier : record_line[3],
          sensitive : (record_line[4] ? true : false),
          title : record_line[5],
          contributor : record_line[6],
          publisher : record_line[8],
          date : new Date(record_line[10]), //need to parse
          unit : record_line[11],
          size : record_line[12],
          page : record_line[13],
          quantity : record_line[14],
          subject : record_line[16],
          catalog : record_line[18],
          content : record_line[19],
          information : record_line[20],
          comment : record_line[22],
          copyright : record_line[23],
          right_in_rem : record_line[24],
          ownership : record_line[25],
          published : (record_line[26] ? true : false),
          licence : record_line[27],
          filename : record_line[28],
          filetype : record_line[29],
          creator : record_line[30],
          created_at : new Date(record_line[31]), //need to parse
          commentor : record_line[32],
          commented_at : new Date(record_line[33]), //need to parse
          updater : record_line[34],
          updated_at : new Date(record_line[35])
        }).save()
        .then(function(record) {
          if (record_line[0]) {
            new models.Category({name: record_line[0]}).fetch()
              .then(function(category) {
                if (category) {
                  record.save({category_id: category.id});
                } else {
                  models.Category.forge({name: record_line[0]}).save()
                    .then(function(category) {
                      record.save({category_id: category.id});
                    });
                }
            });
          }
          if (record_line[1]) {
            new models.Carrier({name: record_line[1]}).fetch()
              .then(function(carrier) {
                if (carrier) {
                  record.save({carrier_id: carrier.id});
                } else {
                  models.Carrier.forge({name: record_line[1]}).save()
                    .then(function(carrier) {
                      record.save({carrier_id: carrier.id});
                    });
                }
            })
          }
          if (record_line[2]) {
            new models.Pattern({name: record_line[2]}).fetch()
              .then(function(pattern) {
                if (pattern) {
                  record.save({pattern_id: pattern.id});
                } else {
                  models.Pattern.forge({name: record_line[2]}).save()
                    .then(function(pattern) {
                      record.save({pattern_id: pattern.id});
                    });
                }
            })
          }
          if (record_line[7]) {
            new models.Issue({name: record_line[7]}).fetch()
              .then(function(issue) {
                if (issue) {
                  record.save({issue_id: issue.id});
                } else {
                  models.Issue.forge({name: record_line[7]}).save()
                    .then(function(issue) {
                      record.save({issue_id: issue.id});
                    });
                }
            })
          }
          if (record_line[15]) {
            new models.Language({name: record_line[15]}).fetch()
              .then(function(language) {
                if (language) {
                  record.save({language_id: language.id});
                } else {
                  models.Language.forge({name: record_line[15]}).save()
                    .then(function(language) {
                      record.save({language_id: language.id});
                    });
                }
            })
          }
          if (record_line[21]) {
            new models.Collector({name: record_line[21]}).fetch()
              .then(function(collector) {
                if (collector) {
                  record.save({collector_id: collector.id});
                } else {
                  models.Collector.forge({name: record_line[21]}).save()
                    .then(function(collector) {
                      record.save({collector_id: collector.id});
                    });
                }
            })
          }
          record_line[17].split("、").map(function(k) {
            new models.Keyword({name: k}).fetch()
              .then(function(keyword){
                if (keyword) {
                  record.keywords().attach(keyword);
                } else {
                  models.Keyword.forge({name: k}).save()
                  .then(function(keyword) {
                    record.keywords().attach(keyword);
                  })
                }
              })
          });
        }).catch(function(err){
          console.log(err);
        }).done()
    });
  });
};

exports.seed();
