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

	entities.push(this);
}

Entity.prototype = {
	update: function() {
		this.sprite.position.set(this.x, this.y);
	},
	destroy: function() {
		stage.removeChild(this.sprite);
		this.sprite = null;
		entities.splice(entities.indexOf(this), 1);
	},
	moveTo: function(x, y) {
		this.x = x;
		this.y = y;
		socket.emit('moved', { id: this.id, x: this.x, y: this.y });
	}
}