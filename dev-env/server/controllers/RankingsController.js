var express = require('express');
var app = express.Router();
var bodyParser = require('body-parser');
var db = require('../db');
var pool = db.getPool(); // re-uses existing if already created or creates new one

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//const Utr = require('../Utr');

///////////Rankings//////////
app.get('/', (req, res) => {

  pool.query('SELECT * FROM rankings ORDER BY singlesRk ASC', function (error, results, fields) {
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

/*
app.post('/', (req, res) => {

  var {id} = req.body;

  Utr.updateRankingList([id]).then((value)=>{

    pool.query('SELECT * FROM rankings ORDER BY singlesRk ASC', function (error, results, fields) {
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
  }).catch( (ex) => {
    console.log(ex)
    return res.json({
        errors: ['could not add player to rankings']
    });

  })

});

app.delete('/:id', (req, res) => {
  //let path = req.apiGateway.event.path;

  var id = req.params.id

  Utr.deleteFromRankings(id).then((value)=>{

    pool.query('SELECT * FROM rankings ORDER BY singlesRk ASC', function (error, results, fields) {
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
  }).catch( (ex) => {
    console.log(ex)
    return res.json({
        errors: ['could not add player to rankings']
    });

  })

});
*/

module.exports = app;
