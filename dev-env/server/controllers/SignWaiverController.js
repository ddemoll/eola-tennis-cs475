var express = require('express');
var app = express.Router();
var bodyParser = require('body-parser');
var db = require('../db');
var pool = db.getPool(); // re-uses existing if already created or creates new one
var aws = require('aws-sdk');
var configjson = require('../../../config/config.json');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json({
    "message": "please use a post request!"
  })
})

/// testing email sending with dev api rest call
app.post('/', (req, res) => {
  console.log("** incoming request's body value **");
  console.log(req.body);
  var namePost = undefined;
  if (req.body.name) {
    namePost = req.body.name; 
  }

  console.log(namePost); 

  if (namePost != undefined) {
    
    // COPY PASTED FROM AWS WEBSITE; https://docs.aws.amazon.com/ses/latest/DeveloperGuide/examples-send-using-sdk.html
    aws.config.loadFromPath("../../config/config.json");

    const charset = "UTF-8";
    var ses = new aws.SES();

    var messageText = "Waiver confirmation for: " + namePost;

    // Specify the parameters to pass to the API.
    var params = { 
      Source: "Eola Developer Email <eola.tennis.developer@gmail.com>", 
      Destination: { 
        ToAddresses: [
          configjson.signWaiver.adminEmail
        ],
      },
      Message: {
        Subject: {
          Data: "EOLA Tennis Waiver Confirmation",
          Charset: charset
        },
        Body: {
          Text: {
            Data: "Message: " + messageText,
            Charset: charset 
          },
          Html: {
            Data: "<html><head></head><body><p>Message: " + messageText + "</p></body></html>",
            Charset: charset
          }
        }
      }
    };
    console.log("About the send email"); 
    console.log(params); 
  //Try to send the email.
  ses.sendEmail(params, function(err, data) {
    // If something goes wrong, print an error message.
    if(err) {
      res.json({
        "status" : "we failed to send the email D;",
        "error" : err
      });
    } else {
      res.json({
        "status" : "we send the message!!!",
        "data" : data
      });
    }
  });

  } // end name post
  else {
    res.json({
      "error" : "No name was provided!"
    }); 
  }
  
});


module.exports = app;
