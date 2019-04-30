var express = require('express');
var app = express.Router();
var bodyParser = require('body-parser');
var db = require('../db');
var pool = db.getPool(); // re-uses existing if already created or creates new one

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


///////////Classes//////////
app.get('/', (req, res) => {

  pool.query('SELECT * FROM classes ORDER BY title DESC', function (error, results, fields) {
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

//insert a new class
app.post('/', (req, res) => {

  var {title, date, description, price, picURI, paypalURL} = req.body;

  pool.query('INSERT INTO classes (title, date, description, price, picURI, paypalURL)' +
				'VALUES (?, ?, ?, ?, ?, ?)', 
			[title, date, description, price, picURI, paypalURL], 
	function (error, results, fields) {
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
  pool.query('DELETE FROM classes WHERE id=?', [id], function (error, results, fields) {
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

  let {title, date, description, price, picURI, paypalURL} = req.body;

  pool.query('UPDATE classes SET title=?, date=?, description=?, price=?, picURI=?, paypalURL=? WHERE id=?', 
	[title, date, description, price, picURI, paypalURL], 
	function (error, results, fields) {
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
