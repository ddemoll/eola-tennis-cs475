var express = require('express');
var app = express();
var db = require('./db');

app.use(require('./controllers'));


module.exports = app;
