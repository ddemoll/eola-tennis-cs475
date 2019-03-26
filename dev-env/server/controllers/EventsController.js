var express = require('express');
var app = express.Router();
var bodyParser = require('body-parser');
var db = require('../db');
var pool = db.getPool(); // re-uses existing if already created or creates new one

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });
var pinpoint = new AWS.Pinpoint();

const APP_ID = "1605806d4c2046759939b7c8a7994a7b";
const DEV_SEGMENT_ID = "755b22713df94ff191a1a6605f6c4efb";


///////////Events//////////
app.get('/', (req, res) => {

  pool.query('SELECT * FROM events WHERE date >= curdate() ORDER BY date ASC', function (error, results, fields) {
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

  var {date, title, subtitle, link} = req.body;

  pool.query('INSERT INTO events (date, title, subtitle, link) VALUES (?, ?, ?, ?)', [date, title, subtitle, link], function (error, results, fields) {
    if (error) {
      console.log('Error running query', error);
      res.statusCode = 404;
      return res.json({
          errors: ['could not insert event']
      });
    } else {
      var params = {
        ApplicationId: APP_ID, /* required */
        WriteCampaignRequest: { /* required */
          HoldoutPercent: 0,
          MessageConfiguration: {
            DefaultMessage: {
              Action: 'OPEN_APP',
              Body: title,
              Title: 'Eola Tennis',
            },
          },
          Name: 'Announcement'+results.insertId,
          Schedule: {
            IsLocalTime: false,
            StartTime: 'IMMEDIATE',
          },
          SegmentId: DEV_SEGMENT_ID,
          SegmentVersion: 1,
        }
      };
      pinpoint.createCampaign(params, function (err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        // successful response
        else res.json({id: results.insertId});
      });
    }

  });
});

app.delete('/:id', (req, res) => {
  //let path = req.apiGateway.event.path;

  let id = req.params.id;//path.substring(path.lastIndexOf('/')+1);
  pool.query('DELETE FROM events WHERE id=?', [id], function (error, results, fields) {
    if (error) {
      console.log('Error running query', error);
      res.statusCode = 404;
      return res.json({
          errors: ['could not delete event']
      });
    } else {
      res.json({});
    }

  });

});
app.put('/', (req, res) => {

  let {date, title, subtitle, link, id} = req.body;

  pool.query('UPDATE events SET date=?, title=?, subtitle=?, link=? WHERE id=?', [date, title, subtitle, link, id], function (error, results, fields) {
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
