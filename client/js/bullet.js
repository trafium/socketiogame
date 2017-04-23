function Bullet(options) {
	this.vSpeed = 0;
	this.hSpeed = 0;

	Entity.call(this, options);

	this.sprite.texture = resources[Bullet.sprites[this.spriteIndex]].texture
}

Bullet.prototype = Object.create(Entity.prototype);

Object.assign(Bullet.prototype, {

});

Bullet.sprites = {
	's_bullet': 'res/img/bullet.png'
};