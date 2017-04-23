var socket;
var player;

function initSocket() {
  socket = io.connect();

  socket.on('updateEntities', function(newEntitiesData) {
    for (var key in newEntitiesData) {
      if (newEntitiesData.hasOwnProperty(key)) {
        var entity = entities[key];
        if (entity) {
          entity.assign(newEntitiesData[key]);
        } else {
          console.log(newEntitiesData[key].type);
          eval(`new ${newEntitiesData[key].type}(${JSON.stringify(newEntitiesData[key])})`);
          // new Entity(newEntitiesData[key])
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
}