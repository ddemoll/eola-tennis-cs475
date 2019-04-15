var express = require('express');
var app = express.Router();
var bodyParser = require('body-parser');
var db = require('../db');
var pool = db.getPool(); // re-uses existing if already created or creates new one

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


///////////Sign Waiver//////////
app.get('/', (req, res) => {

  return res.json({
	  msg: ['sign waiver message is from a get request']
  });
});

app.post('/', (req, res) => {

  return res.json({
	  msg: ['sign waiver message is from a post request']
  });
});


module.exports = app;
