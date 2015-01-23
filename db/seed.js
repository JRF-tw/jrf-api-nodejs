"use strict";

var models  = require('../models');

//var data = require('./data/data');

var lazy = require("lazy");
var fs = require("fs");



new lazy(fs.createReadStream('./data/data.json'))
  .lines
  .forEach(function(line){
    var datum_line = JSON.parse(line);
    models.Datum.create({
      identifier : datum_line[3],
      sensitive : (datum_line[4] ? true : false),
      title : datum_line[5],
      contributor : datum_line[6],
      publisher : datum_line[8],
      date : new Date(datum_line[10]), //need to parse
      unit : datum_line[11],
      size : datum_line[12],
      page : datum_line[13],
      quantity : datum_line[14],
      subject : datum_line[16],
      catalog : datum_line[18],
      content : datum_line[19],
      information : datum_line[20],
      comment : datum_line[22],
      copyright : datum_line[23],
      right_in_rem : datum_line[24],
      ownership : datum_line[25],
      published : (datum_line[26] ? true : false),
      licence : datum_line[27],
      filename : datum_line[28],
      filetype : datum_line[29],
      creator : datum_line[30],
      createdAt : new Date(datum_line[31]), //need to parse
      commentor : datum_line[32],
      commentedAt : new Date(datum_line[33]), //need to parse
      modifier : datum_line[34],
      modifiedAt : new Date(datum_line[35])
    }).then(function(datum){
      console.log('create ok');
      console.log(datum.toJSON());
      models.Category.findOrCreate({where: {name: datum_line[0]}})
        .then(function(category){
          console.log('category ok')
          console.log(category.toJSON());
          datum.setCategory(category);
          console.log(datum.toJSON());
        });
      /**
      models.Carrier.findOrCreate({where: {name: datum_line[1]}})
        .then(function(carrier){
          datum.setCarrier(category);
        });
      models.Pattern.findOrCreate({where: {name: datum_line[2]}})
        .then(function(pattern){
          datum.setPattern(pattern);
        });
      models.Issue.findOrCreate({where: {name: datum_line[7]}})
        .then(function(issue){
          datum.setIssue(issue);
        });
      models.Language.findOrCreate({where: {name: datum_line[15]}})
        .then(function(language){
          datum.setLanguage(language);
        });
      models.Collector.findOrCreate({where: {name: datum_line[21]}})
        .then(function(collector){
          datum.setCollector(collector);
        });
      **/
      var keywords = datum_line[17].split("、");
      //console.log(keywords);
      keywords.map(function(word){
        models.Keyword.findOrCreate({where: {name: word}})
        .then(function(keyword){
          console.log('keyword create ok')
          console.log(keyword.toJSON());
          datum.addKeyword(keyword);
          console.log(datum.toJSON());
        });
      });
      console.log(datum.toJSON());
      datum.save();
    });
  });


