'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('categories', function(table) {
    table.increments('id').primary();
    table.string('name').unique().index();
  }).createTable('carriers', function(table) {
    table.increments('id').primary();
    table.string('name').unique().index();
  }).createTable('patterns', function(table) {
    table.increments('id').primary();
    table.string('name').unique().index();
  }).createTable('issues', function(table) {
    table.increments('id').primary();
    table.string('name').unique().index();
  }).createTable('collectors', function(table) {
    table.increments('id').primary();
    table.string('name').unique().index();
  }).createTable('languages', function(table) {
    table.increments('id').primary();
    table.string('name').unique().index();
  }).createTable('keywords', function(table) {
    table.increments('id').primary();
    table.string('name').unique().index();
  }).createTable('records', function(table) {
    table.increments('id').primary();
    table.integer('category_id').references('categories.id');
    table.integer('carrier_id').references('carriers.id');
    table.integer('pattern_id').references('patterns.id');
    table.integer('issue_id').references('issues.id');
    table.integer('language_id').references('languages.id');
    table.integer('collector_id').references('collectors.id');
    table.string('identifier').unique().index();
    table.boolean('sensitive').defaultTo('false');
    table.string('title');
    table.string('contributor');
    table.string('publisher');
    table.date('date');
    table.string('unit');
    table.string('size');
    table.string('page');
    table.string('quantity');
    table.string('subject');
    table.text('catalog');
    table.text('content');
    table.string('information');
    table.text('comment');
    table.string('copyright');
    table.string('right_in_rem');
    table.string('ownership');
    table.boolean('published').defaultTo(true);
    table.string('licence');
    table.string('filename');
    table.string('filetype');
    table.string('creator');
    table.date('created_at');
    table.string('commentor');
    table.date('commented_at');
    table.string('updater');
    table.date('updated_at');
  }).createTable('keywords_records', function(table) {
    table.integer('keyword_id').references('keywords.id');
    table.integer('record_id').references('records.id');
  });

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('categories')
    .dropTable('carriers')
    .dropTable('patterns')
    .dropTable('issues')
    .dropTable('languages')
    .dropTable('collectors')
    .dropTable('keywords')
    .dropTable('records')
    .dropTable('records_keywords');
};
