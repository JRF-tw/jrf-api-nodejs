var express = require("express");
var config = require("./config/config");
var morgan = require('morgan');
var bodyParser = require('body-parser');

var app = express();

var port = process.env.PORT || 3000;


app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//return static assets
app.use(express.static("./public"));

//echo api route
app.use('/api', require('./api/api'));

//render the app server side
// app.use('/', require('./render/render'));

app.listen(port);

console.log('App started goto - http://0.0.0.0:' + port);