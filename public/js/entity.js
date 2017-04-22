function Entity(options) {
	this.x = options.x;
	this.y = options.y;
	this.id = options.id;
	this.socket = options.socket;

	this.sprite = new Sprite(resources['res/img/smiley.png'].texture);
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
	}
}