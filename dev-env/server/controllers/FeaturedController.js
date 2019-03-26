var express = require('express');
var app = express.Router();
var bodyParser = require('body-parser');
var db = require('../db');
var pool = db.getPool(); // re-uses existing if already created or creates new one

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

///////////Featured Players//////////
app.get('/', (req, res) => {

  pool.query('SELECT * FROM featured_players ORDER BY id DESC LIMIT 25', function (error, results, fields) {
    if (error) {
      console.log('Error running query', error);
      res.statusCode = 404;
      return res.json({
          errors: ['could not get featured_players']
      });
    } else {
      res.json(results);
    }
  });
});

app.post('/', (req, res) => {

  var {name, text, picKey, numStars, youtubeID} = req.body;
  pool.query('INSERT INTO featured_players (name, text, picURI, numStars, youtubeID) VALUES (?, ?, ?, ?)', [name, text, picKey, numStars, youtubeID], function (error, results, fields) {
    if (error) {
      console.log('Error running query', error);
      res.statusCode = 404;
      return res.json({
          errors: ['could not insert featured_players']
      });
    } else {
      res.json({id: results.insertId});


    }

  });
});

app.delete('/:id', (req, res) => {
  //let path = req.apiGateway.event.path;

  let id = req.params.id;//path.substring(path.lastIndexOf('/')+1);
  pool.query('DELETE FROM featured_players WHERE id=?', [id], function (error, results, fields) {
    if (error) {
      console.log('Error running query', error);
      res.statusCode = 404;
      return res.json({
          errors: ['could not delete featured_players']
      });
    } else {
      res.json({});
    }

  });

});
app.put('/', (req, res) => {
  console.log("tersrt")
  let {name, text, numStars, picKey, youtubeID, id} = req.body;
  pool.query('UPDATE featured_players SET name=?, text=?, numStars=?, picURI=?, youtubeID=? WHERE id=?', [name, text, numStars, picKey, youtubeID, id], function (error, results, fields) {
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
