function Entity(options) {
	Object.assign(this, options);

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

	this.spriteIndex = options.spriteIndex;
	this.sprite = new Sprite(resources[Entity.sprites[this.spriteIndex]].texture);
	this.sprite.position.set(this.x, this.y);
	this.sprite.scale.set(0.5, 0.5);
	this.sprite.anchor.set(0.5, 0.5);

	stageObjects.addChild(this.sprite);

	entities[options.socket] = this;
}

Entity.prototype = {
	update: function() {
		this.sprite.position.set(this.x, this.y);
		this.healthContainer.position.set(this.x - this.healthContainer.width/2, this.y - 46);
		this.healthBar.width = (48 / 100) * this.health;
	},
	destroy: function() {
		stageObjects.removeChild(this.sprite);
		interfaceObjects.removeChild(this.healthContainer);

		this.sprite = null;
		this.healthContainer = null;
		this.healthBar = null;

		delete entities[this.socket];
	},
	assign: function(newAttributes) {
		var oldAttributes = Object.assign({}, this);
		for (var key in newAttributes) {
			if (newAttributes.hasOwnProperty(key)) {
				this[key] = newAttributes[key];
			}
		}

		if (newAttributes.spriteIndex != oldAttributes.spriteIndex) {
			this.sprite.texture = resources[Entity.sprites[this.spriteIndex]].texture;
		}
	}
}

Entity.sprites = ['res/img/smiley.png', 'res/img/smiley2.png'];