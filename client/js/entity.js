function Entity(options) {
	Object.assign(this, options);

	this.spriteIndex = options.spriteIndex;
	this.sprite = new Sprite();
	this.sprite.position.set(this.x, this.y);
	this.sprite.scale.set(0.5, 0.5);
	this.sprite.anchor.set(0.5, 0.5);

	stageObjects.addChild(this.sprite);

	entities[options.id] = this;
}

Entity.prototype = {
	update: function() {
		this.sprite.position.set(this.x, this.y);
	},
	destroy: function() {
		stageObjects.removeChild(this.sprite);

		this.sprite = null;

		delete entities[this.id];
	},
	assign: function(newAttributes) {
		var oldAttributes = Object.assign({}, this);
		for (var key in newAttributes) {
			if (newAttributes.hasOwnProperty(key)) {
				this[key] = newAttributes[key];
			}
		}

		if (newAttributes.spriteIndex != oldAttributes.spriteIndex) {
			this.sprite.texture = resources[Player.sprites[this.spriteIndex]].texture;
		}
	}
}