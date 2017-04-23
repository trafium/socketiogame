var express = require('express');
var app = express();
var serv = require('http').Server(app);

app.get('', function(req, res) {
  res.sendFile(__dirname + '/client/index.html');
});
app.use('/', express.static('client'));

serv.listen(8080);

entities = {};

entitiesId = 0;

var io = require('./server/socket.js')(serv);
require('./server/main.js')(io);