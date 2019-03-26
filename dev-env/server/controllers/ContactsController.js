var express = require('express');
var app = express.Router();
var bodyParser = require('body-parser');
var db = require('../db');
var pool = db.getPool(); // re-uses existing if already created or creates new one

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

///////////Contacts//////////
app.get('/', (req, res) => {

  pool.query('SELECT * FROM contacts', function (error, results, fields) {
    if (error) {
      console.log('Error running query', error);
      res.statusCode = 404;
      return res.json({
          errors: ['could not get rankings']
      });
    } else {
      res.json(results);
    }
  });
});


module.exports = app;
