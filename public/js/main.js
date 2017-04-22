var renderer = PIXI.autoDetectRenderer(512, 512);
var view = renderer.view

document.body.appendChild(renderer.view);

var stage = new PIXI.Container();

var TextureCache = PIXI.utils.TextureCache;
var TilingSprite = PIXI.extras.TilingSprite;
var Sprite = PIXI.Sprite;

var loader = PIXI.loader;
var resources = PIXI.loader.resources;

var entities = [];

loader
	.add([
		'res/img/grass_0.png',
		'res/img/smiley.png'
		])
	.load(setup);

function setup() {
	initSocket();
	var grass = new TilingSprite(resources['res/img/grass_0.png'].texture, view.width, view.height);
	stage.addChild(grass);

	gameLoop();
}

function gameLoop() {
	requestAnimationFrame(gameLoop);

	for (var i = 0; i < entities.length; i++) {
		entities[i].update();
	}

	renderer.render(stage);
}

view.addEventListener('mousemove', function(event) {
	if (event.buttons == 1) {
		var rect = view.getBoundingClientRect();
		socket.emit('moved', { x: event.clientX - rect.left, y: event.clientY - rect.top } );
	}
});