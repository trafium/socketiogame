var socketio = require('socket.io');
var Entity = require('./entity')
var Player = require('./player.js')

module.exports = (server) => {
  var io = socketio.listen(server);

  io.on('connection', (socket) => {
    
    var newPlayer = new Player();

    socket.entityId = newPlayer.id;

    socket.join('main');
    console.log('Socket connected: ' + socket.id);

    socket.on('fire', function(target) {
      var player = players[socket.entityId];
      player.fire(target);
    });

    socket.on('keydown', function(data) {
      var player = players[socket.entityId];

      if (player) {
        switch(data) {
          case 87: {
            player.setSpeed({ vSpeed: -2 });
            break;
          }
          case 83: {
            player.setSpeed({ vSpeed: 2 });
            break;
          }
          case 65: {
            player.setSpeed({ hSpeed: -2 });
            break;
          }
          case 68: {
            player.setSpeed({ hSpeed: 2 });
            break;
          }
        }
      }
    });

    socket.on('keyup', function(data) {
      var player = players[socket.entityId];

      if (player) {
        switch(data) {
          case 87: {
            if (player.vSpeed < 0) {
              player.vSpeed = 0;
            }
            break;
          }
          case 83: {
            if (player.vSpeed > 0) {
              player.vSpeed = 0;
            }
            break;
          }
          case 65: {
            if (player.hSpeed < 0) {
              player.hSpeed = 0;
            }
            break;
          }
          case 68: {
            if (player.hSpeed > 0) {
              player.hSpeed = 0;
            }
            break;
          }
        }
      }
    });

    socket.on('disconnect', function() {
      console.log('Socket disconnected: '+socket.id);
      var player = players[socket.entityId]
      if (player) {
        delete players[socket.entityId]
      }
    });
  });

  return io
}