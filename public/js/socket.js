var socket;
var player;

function initSocket() {
  socket = io.connect();

  socket.on('initPlayer', function(options) {
    new Entity(options);
    console.log('initPlayer', options);
  });

  socket.on('newPlayer', function(options) {
    new Entity(options);
  });

  socket.on('getPlayers', function(players) {
    console.log(players);
    for (var i = 0; i < players.length; i++) {
      if (!player || players[i].id != player.id) {
        new Entity(players[i])
      }
    }
  });

  socket.on('moved', function(data) {
    var id = data.id;
    var entity;

    for (var i = 0; i < entities.length; i++) {
      if (entities[i].id == id) {
        entity = entities[i];
        break;
      }
    }
    if (entity) {
      entity.x = data.x;
      entity.y = data.y;
    }
  });

  socket.on('playerDisconnected', function(id) {
    var found = false;
    for (var i = 0; i < entities.length; i++) {
      if (entities[i].id == id) {
        found = true;
        break;
      }
    }
    if (found) {
      entities[i].destroy();
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