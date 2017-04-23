var socketio = require('socket.io');
var Entity = require('./entity')
var Player = require('./player.js')

module.exports = (server) => {
  var io = socketio.listen(server);

  io.on('connection', (socket) => {
    io.to(socket.id).emit('getPlayers', entities);
    
    var newPlayer = new Player();

    socket.entityId = newPlayer.id;

    socket.join('main');
    console.log('Socket connected: ' + socket.id);

    socket.on('fire', function(target) {
      var entity = entities[socket.entityId];
      entity.fire(target);
    });

    socket.on('keydown', function(data) {
      var entity = entities[socket.entityId];

      if (entity) {
        switch(data) {
          case 87: {
            entity.setSpeed({ vSpeed: -2 });
            break;
          }
          case 83: {
            entity.setSpeed({ vSpeed: 2 });
            break;
          }
          case 65: {
            entity.setSpeed({ hSpeed: -2 });
            break;
          }
          case 68: {
            entity.setSpeed({ hSpeed: 2 });
            break;
          }
        }
      }
    });

    socket.on('keyup', function(data) {
      var entity = entities[socket.entityId];

      if (entity) {
        switch(data) {
          case 87: {
            if (entity.vSpeed < 0) {
              entity.vSpeed = 0;
            }
            break;
          }
          case 83: {
            if (entity.vSpeed > 0) {
              entity.vSpeed = 0;
            }
            break;
          }
          case 65: {
            if (entity.hSpeed < 0) {
              entity.hSpeed = 0;
            }
            break;
          }
          case 68: {
            if (entity.hSpeed > 0) {
              entity.hSpeed = 0;
            }
            break;
          }
        }
      }
    });

    socket.on('disconnect', function() {
      console.log('Socket disconnected: '+socket.id);
      entity = entities[socket.entityId]
      if (entity) {
        delete entities[socket.entityId]
      }
    });
  });

  return io
}