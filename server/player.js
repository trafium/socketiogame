Entity = require('./entity.js');
Bullet = require('./bullet.js');

function Player() {
	Entity.call(this);

	this.type = 'Player';
	this.health = 100;

	this.width = 48;
	this.height = 48;

	players[this.id] = this;
}

Player.prototype = Object.create(Entity.prototype);

Object.assign(Player.prototype, {
	update: function() {
		if (this.alive()) {
			if ((this.hSpeed > 0 && (this.x + this.hSpeed + 32) < 512) || 
				(this.hSpeed < 0 && (this.x + this.hSpeed - 32) > 0)) {
				this.x += this.hSpeed;
			}
			if ((this.vSpeed > 0 && (this.y + this.vSpeed + 32) < 512) || 
				(this.vSpeed < 0 && (this.y + this.vSpeed - 32) > 0)) {
				this.y += this.vSpeed;
			}
		}

		var colliding = false;
		for (var key in players) {
			if (players.hasOwnProperty(key) && players[key] != this) {
				var player = players[key];

				if (this.checkCollision(player) && player.type == 'Player' && player.alive() && this.alive()) {
					colliding = true;
					this.getHurt(1);
				}
			}
		}

		if (colliding) {
			this.spriteIndex = 's_smiley2';
		} else if (this.alive()) {
			this.spriteIndex = 's_smiley';
		}
	},
	getHurt(damage) {
		if (this.alive()) {
 			this.health -= damage
			if (!this.alive()) {
				this.die();
			}
		}
	},
	alive: function() {
		return this.health > 0;
	},
	die: function() {
		this.spriteIndex = 's_smiley2';
		setTimeout(() => {
			this.health = 100;
		}, 3000);
	},
	setSpeed: function(options) {
		if (this.alive()) {
			Object.assign(this, options);
		}
	},
	fire: function(target) {
		if (this.alive()) {
			new Bullet(this, target);
		}
	}
});

module.exports = Player;