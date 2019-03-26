var express = require('express');
var app = express.Router();
var bodyParser = require('body-parser');
var db = require('../db');
var pool = db.getPool(); // re-uses existing if already created or creates new one

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


///////////Announcements//////////
app.get('/', (req, res) => {

  pool.query('SELECT * FROM store ORDER BY id DESC', function (error, results, fields) {
    if (error) {
      console.log('Error running query', error);
      res.statusCode = 404;
      return res.json({
          errors: ['could not get items']
      });
    } else {
      res.json(results);
    }
  });
});

app.post('/', (req, res) => {

  var {text, price, paypalURL, picKey} = req.body;

  pool.query('INSERT INTO store (text, price, paypalURL, picURI) VALUES (?, ?, ?, ?)', [text, price, paypalURL, picKey], function (error, results, fields) {
    if (error) {
      console.log('Error running query', error);
      res.statusCode = 404;
      return res.json({
          errors: ['could not insert item']
      });
    } else {
      res.json({id: results.insertId});
    }

  });
});

app.delete('/:id', (req, res) => {
  //let path = req.apiGateway.event.path;

  let id = req.params.id;//path.substring(path.lastIndexOf('/')+1);
  pool.query('DELETE FROM store WHERE id=?', [id], function (error, results, fields) {
    if (error) {
      console.log('Error running query', error);
      res.statusCode = 404;
      return res.json({
          errors: ['could not delete item']
      });
    } else {
      res.json({});
    }

  });

});
app.put('/', (req, res) => {

  let {text, picKey, id, youtubeID} = req.body;

  pool.query('UPDATE store SET text=?, picURI=? WHERE id=?', [text, picKey, id], function (error, results, fields) {
    if (error) {
      console.log('Error running query', error);
      res.statusCode = 404;
      return res.json({
          status: false
      });

    } else {
      res.json({status: true});
    }

  });

});

module.exports = app;
