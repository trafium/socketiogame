function Entity(options) {
	console.log(options);
	this.x = options.x;
	this.y = options.y;
	this.id = options.id;
	this.socket = options.socket;

	this.spriteIndex = options.spriteIndex;
	this.sprite = new Sprite(resources[Entity.sprites[this.spriteIndex]].texture);
	this.sprite.position.set(this.x, this.y);
	this.sprite.scale.set(0.5, 0.5);
	this.sprite.anchor.set(0.5, 0.5);
	stage.addChild(this.sprite);

	console.log(socket);

	entities[options.socket] = this;
}

Entity.prototype = {
	update: function() {
		this.sprite.position.set(this.x, this.y);
	},
	destroy: function() {
		stage.removeChild(this.sprite);
		this.sprite = null;

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