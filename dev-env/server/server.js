var app = require('./app');
var config = require('../../config/config.json');
var port = process.env.PORT || config.devapi.serverport || 3000;

var server = app.listen(port, function() {
  console.log('Express server listening on port ' + port);
});