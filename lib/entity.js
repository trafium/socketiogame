id = 0;

function Entity(x, y, socketId) {
	this.x = x;
	this.y = y;
	this.id = id;
	this.socket = socketId

	id++;

	entities.push(this);
}

Entity.prototype = {
}

module.exports = Entity;