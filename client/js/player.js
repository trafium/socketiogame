function Player(options) {
	this.initHealthBar();
	Entity.call(this, options);

	this.sprite.texture = resources[Player.sprites[this.spriteIndex]].texture
}

Player.prototype = Object.create(Entity.prototype);

Object.assign(Player.prototype, {
	initHealthBar: function() {
		this.healthContainer = new Container();
		var blackRect = new Graphics();
		blackRect.beginFill(0x000000);
		blackRect.drawRect(0, 0, 50, 10);
		this.healthBar = new Graphics();
		this.healthBar.beginFill(0x00FF00);
		this.healthBar.drawRect(1, 1, 48, 8);

		this.healthContainer.addChild(blackRect);
		this.healthContainer.addChild(this.healthBar);

		interfaceObjects.addChild(this.healthContainer);
	},
	update: function() {
		Entity.prototype.update.call(this);
		this.healthContainer.position.set(this.x - this.healthContainer.width/2, this.y - 46);
		this.healthBar.width = (48 / 100) * this.health;
	},
	destroy: function() {
		Entity.prototype.destroy.call(this);
		interfaceObjects.removeChild(this.healthContainer);

		this.healthContainer = null;
		this.healthBar = null;
	}
});

Player.sprites = {
	's_smiley': 'res/img/smiley.png', 
	's_smiley2': 'res/img/smiley2.png'
};