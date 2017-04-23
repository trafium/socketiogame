var id = 0;

function Entity(x, y, socketId) {
	this.x = x;
	this.y = y;

	this.vSpeed = 0;
	this.hSpeed = 0;

	this.width = 48;
	this.height = 48;

	this.health = 100;

	this.spriteIndex = 1;

	this.id = id;
	this.socket = socketId

	id++;

	entities[socketId] = this;
}

Entity.prototype = {
	update: function() {
		if (this.alive()) {
			this.x += this.hSpeed;
			this.y += this.vSpeed;
		}

		var colliding = false;
		for (var key in entities) {
			if (entities.hasOwnProperty(key) && entities[key] != this) {
				var entity = entities[key];

				if (this.checkCollision(entity) && entity.alive() && this.alive()) {
					colliding = true;
					if (this.alive()) {
						this.health -= 1;
					}
					if (!this.alive()) {
						this.die();
					}
				}
			}
		}

		if (colliding) {
			this.spriteIndex = 1;
		} else if (this.alive()) {
			this.spriteIndex = 0;
		}
	},
	getBoundingRectangle: function() {
		return {
			x1: this.x - (this.width/2),
			x2: this.x + (this.width/2),
			y1: this.y - (this.height/2),
			y2: this.y + (this.height/2)
		}
	},
	checkCollision: function(other) {
		rect1 = this.getBoundingRectangle();
		rect2 = other.getBoundingRectangle();

		if (rect1.x1 < rect2.x2 && rect1.x2 > rect2.x1 
			&& rect1.y1 < rect2.y2 && rect1.y2 > rect2.y1) {
			return true;
		} else {
			return false;
		}
	},
	alive: function() {
		return this.health > 0;
	},
	die: function() {
		setTimeout(() => {
			this.health = 100;
		}, 3000);
	},
	setSpeed: function(options) {
		if (this.alive()) {
			Object.assign(this, options);
		}
	}
}

module.exports = Entity;