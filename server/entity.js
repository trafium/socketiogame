function Entity(x, y) {
	this.type = 'Entity';


	this.vSpeed = 0;
	this.hSpeed = 0;

	this.width = 1;
	this.height = 1;

	this.x = x || this.width/2 + Math.random()*(512 - this.width);
	this.y = y || this.height/2 + Math.random()*(512 - this.height);

	this.spriteIndex = 's_nothing';

	this.id = entitiesId;

	entitiesId++;

}

Entity.prototype = {
	update: function() {

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
	}
}

module.exports = Entity;