var id = 0;

function Entity(x, y, socketId) {
	this.x = x;
	this.y = y;

	this.vSpeed = 0;
	this.hSpeed = 0;

	this.id = id;
	this.socket = socketId

	id++;

	entities[socketId] = this;
}

Entity.prototype = {
	update: function() {
		this.x += this.hSpeed;
		this.y += this.vSpeed;
	}
}

module.exports = Entity;