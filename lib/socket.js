var socketio = require('socket.io');
var Entity = require('./entity')

entities = [];

module.exports = (server) => {
  var io = socketio.listen(server);

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

    socket.on('moved', function(data) {
      var entity;
      for (var i = 0; i < entities.length; i++) {
        if (entities[i].socket == socket.id) {
          entity = entities[i];
          break;
        }
      }
      if (entity) {
        entity.x = data.x;
        entity.y = data.y;

        io.to('main').emit('moved', { id: entity.id, x: data.x, y: data.y });
      }
    });

    socket.on('disconnect', function() {
      var id;
      var found = false;
      for (var i = 0; i < entities.length; i++) {
        if (entities[i].socket == socket.id) {
          id = entities[i].id;
          found = true;
          break;
        }
      }
      if (found) {
        entities.splice(i,1);
        io.to('main').emit('playerDisconnected', id);
      }
    });
  });
}