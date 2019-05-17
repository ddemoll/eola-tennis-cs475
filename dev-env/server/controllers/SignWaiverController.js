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
  var emailPost = undefined;
  var cellphonePost = undefined;
  var selectedFormPost = undefined;
  if (req.body.name) {
    namePost = req.body.name; 
  } 
  if (req.body.email) {
    emailPost = req.body.email; 
  } 
  if (req.body.cellphone) {
    cellphonePost = req.body.cellphone; 
  }
  if (req.body.selectedForm) {
    selectedFormPost = req.body.selectedForm; 
  }
  

  console.log(namePost); 

  if (namePost != undefined && emailPost != undefined && cellphonePost != undefined && selectedFormPost != undefined) {
    
    // COPY PASTED FROM AWS WEBSITE; https://docs.aws.amazon.com/ses/latest/DeveloperGuide/examples-send-using-sdk.html
    aws.config.loadFromPath("../../config/config.json");

    const charset = "UTF-8";
    var ses = new aws.SES();

    var typeOfFormText = "No form type selected";
    if (selectedFormPost == 'adult') {
      typeOfFormText = "Adult"
    } else if (selectedFormPost == 'parent') {
      typeOfFormText = "Parent"
    }
    var messageText = "Waiver confirmation for: " + namePost + "\nType of form: " + typeOfFormText + "\nEmail: " + emailPost + "\nCellphone Number: " + cellphonePost + "\n\n";
    var messageTextHtml = "<p>Waiver confirmation for: " + namePost + "</p><p>Type of form: " + typeOfFormText + "</p>Email: " + emailPost + "</p><p>Cellphone Number: " + cellphonePost + "</p>";

    // Specify the parameters to pass to the API.
    var params = { 
      Source: "Eola Developer Email <eola.tennis.developer@gmail.com>", 
      Destination: { 
        ToAddresses:  configjson.signWaiver.adminEmails,
      },
      Message: {
        Subject: {
          Data: "EOLA Tennis Waiver Confirmation",
          Charset: charset
        },
        Body: {
          Text: {
            Data: "Waiver confirmation automatically submitted through the mobile app: " + messageText,
            Charset: charset 
          },
          Html: {
            Data: "<html><head></head><body><p>Waiver confirmation automatically submitted through the mobile app: " + messageTextHtml + "</p><p>Eola Tennis Club. Do not reply to this email</p></body></html>",
            Charset: charset
          }
        }
      }
    };
    console.log("About the send email"); 
    console.log(params); 
  //Try to send the email.
  ses.sendEmail(params, function(err, data) {
    console.log("Response from email");
    console.log(err);
    console.log(data); 
    // If something goes wrong, print an error message.
    if(err) {
      res.json({
        "status" : "we failed to send the email",
        "success" : false,
        "error" : err
      });
    } else {
      res.json({
        "status" : "we sent the email",
        "success" : true,
        "data" : data
      });
    }
  });

  } // end name post
  else {
    res.json({
      "success" : false,
      "error" : "No name, email, or cellphone was provided!"
    }); 
  }
  
});


module.exports = app;
