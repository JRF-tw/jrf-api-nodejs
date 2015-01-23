var api = require("express").Router({caseSensitive: true, strict: true});
var models  = require('../models');
var Sequelize = require('sequelize')

function filterResult(data) {
  var result = data.map(function (d) {
    return {
      id: d.id,
      title: d.title,
      content: d.content
    };
  });
  return result;
}

api.get('/data/', function (req, res, next) {
  var query = req.query.query;
  var offset = req.query.offset;
  var limit = req.query.limit;
  if (!offset){
    offset = 0;
  }
  if (!query) {
    if (limit) {
      return models.Datum.findAndCountAll({ offset: offset, limit: limit, include: [models.Carrier, models.Category, models.Collector, models.Issue, models.Language, models.Keyword, models.Language, models.Pattern] })
        .then(function(data, err){
          if (err) {
            return console.log(err);
          }
          return res.json({
            status: "success",
            data: data.rows,
            count: data.count
          });
        });
    } else {
      return models.Datum.findAndCountAll({
        include: [models.Carrier, models.Category, models.Collector, models.Issue, models.Language, models.Keyword, models.Language, models.Pattern]
      })
        .then(function(data, err){
          if (err) {
            return console.log(err);
          }
          return res.json({
            status: "success",
            data: data.rows,
            count: data.count
          });
        });
      }
  } else {
    query = '%' + query + '%';
    if (limit) {
      return models.Datum.findAndCountAll({
        where: Sequelize.or(
            { title: { like: query }},
            { content: { like: query }}
          ),
        offset: offset,
        limit: limit,
        include: [models.Carrier, models.Category, models.Collector, models.Issue, models.Language, models.Keyword, models.Language, models.Pattern]
      }).then(function(data, err){
          if (err) {
            return console.log(err);
          }
          return res.json({
            status: "success",
            data: data.rows,
            count: data.count
          });
        });
    } else {
      return models.Datum.findAndCountAll({
        where: Sequelize.or(
            { title: { like: query }},
            { content: { like: query }}
          ),
        include: [models.Carrier, models.Category, models.Collector, models.Issue, models.Language, models.Keyword, models.Language, models.Pattern]
        }).then(function(data, err){
          if (err) {
            return console.log(err);
          }
          console.log(data);
          return res.json({
            status: "success",
            data: data.rows,
            count: data.count
          });
        });
      }
    }
  });
api.get('/data/:id', function (req, res, next) {
    var id = req.params.id
    return models.Datum.find({
        where: {id: id},
        include: [models.Carrier, models.Category, models.Collector, models.Issue, models.Language, models.Keyword, models.Language, models.Pattern]
      }).then(function(datum, err){
        if (err) {
          console.log(err);
          res.json({
            status: "failed",
            error: err
          });
        }
        if (!datum) {
          console.log('not found');
          res.json({
            status: "failed",
            error: 'not found'
          });
        }
        return res.json({
          status: "success",
          data: {
            id: datum.id,
            title: datum.title,
            content: datum.content
          }
        });
      });
  });

module.exports = api;
