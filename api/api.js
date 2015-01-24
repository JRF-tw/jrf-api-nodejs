var api = require("express").Router({caseSensitive: true, strict: true});
var models  = require('../models');

function filterResult(record) {
  var result = record.map(function (d) {
    return {
      id: d.id,
      title: d.title,
      content: d.content
    };
  });
  return result;
}

api.get('/records/', function (req, res, next) {
  var query = req.query.query;
  var offset = req.query.offset;
  var limit = req.query.limit;
  if (!offset){
    offset = 0;
  }
  if (!query) {
    if (limit) {
      models.Record.query(function(qb) {
        qb.limit(limit).offset(offset)
      })
      .fetch({withRelated: ['category', 'carrier', 'collector', 'issue', 'language', 'pattern', 'keywords']})
      .then(function(records){
        models.knex('records').count('*').then(function(ret){
          res.json({
            status: "success",
            records: records.toJSON(),
            count: parseInt(ret[0].count)
          });
        });
      })
    } else {
      models.Record.fetchAll({withRelated: ['category', 'carrier', 'collector', 'issue', 'language', 'pattern', 'keywords']})
      .then(function(records){
        models.knex('records').count('*').then(function(ret){
          res.json({
            status: "success",
            records: records.toJSON(),
            count: parseInt(ret[0].count)
          });
        });
      });
    }
  } else {
    query = '%' + query + '%';
    if (limit) {
      models.Record.query(function(qb) {
        qb.where('title', 'LIKE', query).orWhere('content', 'LIKE', query).limit(limit).offset(offset)
      })
      .fetch({withRelated: ['category', 'carrier', 'collector', 'issue', 'language', 'pattern', 'keywords']})
      .then(function(records){
        models.knex('records').count('*').then(function(ret){
          res.json({
            status: "success",
            records: records.toJSON(),
            count: parseInt(ret[0].count)
          });
        });
      })
    } else {
      models.Record.query(function(qb) {
        qb.where('title', 'LIKE', query).orWhere('content', 'LIKE', query)
      })
      .fetch({withRelated: ['category', 'carrier', 'collector', 'issue', 'language', 'pattern', 'keywords']})
      .then(function(records){
        models.knex('records').count('*').then(function(ret){
          res.json({
            status: "success",
            record: records.toJSON(),
            count: parseInt(ret[0].count)
          });
        });
      })
    }
  }
});
api.get('/records/:id/', function (req, res, next) {
    var id = req.params.id
    if (isNaN(id)) {
      new models.Record({identifier: id}).fetch()
      .then(function(record) {
        if(record) {
          return res.json({
            status: "success",
            record: record.toJSON()
          });
        } else {
          return res.json({
            status: "failed",
            error: 'not found'
          });
        }
      })
    } else {
      new models.Record({id: id}).fetch()
      .then(function(record) {
        if(record) {
          return res.json({
            status: "success",
            record: record.toJSON()
          });
        } else {
          return res.json({
            status: "failed",
            error: 'not found'
          });
        }
      })
    }
  });

module.exports = api;
