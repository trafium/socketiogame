Entity = require('./entity.js');

function Bullet(owner, target) {
	Entity.call(this, owner.x, owner.y);
	this.type = 'Bullet';

	this.spriteIndex = 's_bullet';
	
	this.owner = owner;
	this.direction = Math.atan2(target.y - this.y, target.x - this.x);
	this.speed = 10;

	bullets[this.id] = this;
}

Bullet.prototype = Object.create(Entity.prototype);

Object.assign(Bullet.prototype, {
	update: function() {
		Entity.prototype.update.call(this);

		this.x += this.speed * Math.cos(this.direction);
		this.y += this.speed * Math.sin(this.direction);

		if (this.x > 512 || this.x < 0 || this.y > 512 || this.y < 0) {
			delete bullets[this.id];
		}

		for (var key in players) {
			if (players.hasOwnProperty(key)) {
				var player = players[key]
				if (player.type == 'Player' && this.owner != player) {
					if (this.checkCollision(player)) {
						player.getHurt(10);
						delete bullets[this.id];
					}
				}
			}
		}
	}
});

module.exports = Bullet;