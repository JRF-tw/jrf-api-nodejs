'use strict';
var lazy = require("lazy");
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require("fs"));
var readline = require('readline');
var stream = require('stream');
var models = require("../models");

var add_category = Promise.method(function(record, category_name){
  if (category_name) {
      return new models.Category({name: category_name}).fetch()
        .then(function(category) {
          if (category) {
            return record.save({category_id: category.id});
          } else {
            models.Category.forge({name: category_name}).save()
              .then(function(category) {
                return record.save({category_id: category.id});
              });
          }
      });
  } else {
    return record;
  }
});

var add_carrier = Promise.method(function(record, carrier_name){
  if (carrier_name) {
      return new models.Carrier({name: carrier_name}).fetch()
        .then(function(carrier) {
          if (carrier) {
            return record.save({carrier_id: carrier.id});
          } else {
            models.Carrier.forge({name: carrier_name}).save()
              .then(function(carrier) {
                return record.save({carrier_id: carrier.id});
              });
          }
      });
  } else {
    return record;
  }
});

var add_pattern = Promise.method(function(record, pattern_name){
  if (pattern_name) {
      return new models.Pattern({name: pattern_name}).fetch()
        .then(function(pattern) {
          if (pattern) {
            return record.save({pattern_id: pattern.id});
          } else {
            models.Pattern.forge({name: pattern_name}).save()
              .then(function(pattern) {
                return record.save({pattern_id: pattern.id});
              });
          }
      });
  } else {
    return record;
  }
});

var add_issue = Promise.method(function(record, issue_name){
  if (issue_name) {
      return new models.Issue({name: issue_name}).fetch()
        .then(function(issue) {
          if (issue) {
            return record.save({issue_id: issue.id});
          } else {
            models.Issue.forge({name: issue_name}).save()
              .then(function(issue) {
                return record.save({issue_id: issue.id});
              });
          }
      });
  } else {
    return record;
  }
});

var add_language = Promise.method(function(record, language_name){
  if (language_name) {
      return new models.Language({name: language_name}).fetch()
        .then(function(language) {
          if (language) {
            return record.save({language_id: language.id});
          } else {
            models.Language.forge({name: language_name}).save()
              .then(function(language) {
                return record.save({language_id: language.id});
              });
          }
      });
  } else {
    return record;
  }
});

var add_collector = Promise.method(function(record, collector_name){
  if (collector_name) {
      return new models.Collector({name: collector_name}).fetch()
        .then(function(collector) {
          if (collector) {
            return record.save({collector_id: collector.id});
          } else {
            models.Collector.forge({name: collector_name}).save()
              .then(function(collector) {
                return record.save({collector_id: collector.id});
              });
          }
      });
  } else {
    return record;
  }
});

var add_keywords = Promise.method(function(record, keywords_list){
  keywords_list = keywords_list.split("、");
  Promise.each(keywords_list, function(k) {
    return new models.Keyword({name: k}).fetch()
      .then(function(keyword){
        if (keyword) {
          return record.keywords().attach(keyword);
        } else {
          models.Keyword.forge({name: k}).save()
          .then(function(keyword) {
            return record.keywords().attach(keyword);
          })
        }
      });
  }).then(function(record){return record;});
});

function parse_data( date_string ){
  //console.log(date_string);
  return new Date(date_string);
}




var line_work = function(line){
  //console.log(line);
  return Promise.method(function(){
    var record_line = JSON.parse(line);
    //console.log(record_line);
    models.Record.forge({
      identifier : record_line[3],
      sensitive : (record_line[4] ? true : false),
      title : record_line[5],
      contributor : record_line[6],
      publisher : record_line[8],
      date : parse_data(record_line[10]), //need to parse
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
      created_at : parse_data(record_line[31]), //need to parse
      commentor : record_line[32],
      commented_at : parse_data(record_line[33]), //need to parse
      updater : record_line[34],
      updated_at : parse_data(record_line[35])
    }).save()
    .then(function(record) {
      return add_category(record, record_line[0]);
    }).then(function(record) {
      return add_carrier(record, record_line[1]);
    }).then(function(record) {
      return add_pattern(record, record_line[2]);
    }).then(function(record) {
      return add_issue(record, record_line[7]);
    }).then(function(record) {
      return add_language(record, record_line[15]);
    }).then(function(record) {
      return add_collector(record, record_line[21]);
    }).then(function(record) {
      return add_keywords(record, record_line[17]);
    }).catch(function(err){
      console.log(err);
    }).done(function(record){
      consoel.log(record);
    });
  });
};

exports.seed = function(models, Promise) {
  models.knex.raw('DELETE FROM keywords_records; DELETE FROM records;')
  .then(function(){
    return new Promise(function(resolve) {
        //Without new Promise, this throwing will throw an actual exception
        var records_list = [];
        new lazy(fs.createReadStream('./seeds/data/data.json'))
          .lines
          .forEach(function(line){
            records_list.push(line)
          })
        resolve(records_list);
    });
  }).each(function(line){
    line_work(line)();
  }).done(function(){ console.log('done'); });
};
exports.seed(models, Promise);


