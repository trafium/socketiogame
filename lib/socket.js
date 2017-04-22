var socketio = require('socket.io');
var Entity = require('./entity')

module.exports = (server) => {
  io = socketio.listen(server);

  io.on('connection', (socket) => {
    io.to(socket.id).emit('getPlayers', entities);
    
    var newPlayer = new Entity(Math.random()*512, Math.random()*512, socket.id);
    io.to(socket.id).emit('initPlayer', newPlayer);
    socket.broadcast.to('main').emit('newPlayer', newPlayer)
    
    console.log('Socket connected: ' + socket.id);
    socket.join('main');

    socket.on('postLine', (line) => {
      // lines.push(line);
      socket.broadcast.to('main').emit('getLine', line);
    });

    socket.on('postCurrentImage', (image) => {
      currentImage = image;
    });

    socket.on('keydown', function(data) {
      var entity = entities[socket.id];

      if (entity) {
        switch(data) {
          case 87: {
            entity.vSpeed = -2;
            break;
          }
          case 83: {
            entity.vSpeed = 2
            break;
          }
          case 65: {
            entity.hSpeed = -2;
            break;
          }
          case 68: {
            entity.hSpeed = 2
            break;
          }
        }
      }
    });

    socket.on('keyup', function(data) {
      var entity = entities[socket.id];

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
      entity = entities[socket.id]
      if (entity) {
        delete entities[socket.id]
        io.to('main').emit('playerDisconnected', socket.id);
      }
    });
  });
}