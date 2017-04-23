var socket;
var player;

function initSocket() {
  socket = io.connect();

  socket.on('initPlayer', function(options) {
    new Entity(options);
  });

  socket.on('newPlayer', function(options) {
    new Entity(options);
  });

  socket.on('getPlayers', function(players) {
    for (var key in players) {
      if (players.hasOwnProperty(key)) {
        new Entity(players[key]);
      }
    }
  });

  socket.on('playerDisconnected', function(socketId) {
    var entity = entities[socketId];
    var found = false;
    if (entity) {
      entity.destroy();
    }
  });

  socket.on('updateEntities', function(newEntitiesData) {
    for (var key in newEntitiesData) {
      if (newEntitiesData.hasOwnProperty(key)) {
        var entity = entities[key];
        if (entity) {
          entity.assign(newEntitiesData[key]);
        }
      }
    }

    for (var key in entities) {
      if (entities.hasOwnProperty(key)) {
        if (!newEntitiesData[key]) {
          entities[key].destroy();
        }
      }
    }
  });

  // socket.on('getCurrentImage', function(url) {
  //   // drawAsync(context, lines, 100);
  //   var image = new Image();
  //   image.src = url;
  //   image.onload = function() {
  //     context.drawImage(image, 0, 0);
  //   };
  // });

  // socket.on('getLine', function(line) {
  //   drawLine(line);
  // });

  // socket.on('clear', function() {
  //   clear();
  // });
}