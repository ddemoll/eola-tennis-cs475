var express = require('express');
var app = express.Router();
var bodyParser = require('body-parser');
var db = require('../db');
var pool = db.getPool(); // re-uses existing if already created or creates new one

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


///////////Announcements//////////
app.get('/', (req, res) => {
  pool.query('SELECT * FROM announcements ORDER BY id DESC LIMIT 25', function (error, results, fields) {
    if (error) {
      console.log('Error running query', error);
      res.statusCode = 404;
      return res.json({
          errors: ['could not get events']
      });
    } else {
      res.json(results);
    }
  });
});

app.post('/', (req, res) => {
  var {text, picKey, youtubeID} = req.body;
  let date = new Date().toISOString();
  let sqlDate = date.slice(0, 19).replace('T', ' ');
  pool.query('INSERT INTO announcements (text, date, picURI, youtubeID) VALUES (?, ?, ?, ?)', [text, sqlDate, picKey, youtubeID], function (error, results, fields) {
    if (error) {
      console.log('Error running query', error);
      res.statusCode = 404;
      return res.json({
          errors: ['could not insert announcement']
      });
    } else {
      res.json({id: results.insertId, date});
    }

  });
});

app.delete('/:id', (req, res) => {
  //let path = req.apiGateway.event.path;
  let id = req.params.id;//path.substring(path.lastIndexOf('/')+1);
  pool.query('DELETE FROM announcements WHERE id=?', [id], function (error, results, fields) {
    if (error) {
      console.log('Error running query', error);
      res.statusCode = 404;
      return res.json({
          errors: ['could not delete announcement']
      });
    } else {
      res.json({});
    }

  });

});
app.put('/', (req, res) => {
  let {text, picKey, id, youtubeID} = req.body;

  pool.query('UPDATE announcements SET text=?, picURI=?, youtubeID=? WHERE id=?', [text, picKey, youtubeID, id], function (error, results, fields) {
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
