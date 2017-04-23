var renderer = PIXI.autoDetectRenderer(512, 512);
var view = renderer.view

document.body.appendChild(renderer.view);

var Container = PIXI.Container;
var TextureCache = PIXI.utils.TextureCache;
var TilingSprite = PIXI.extras.TilingSprite;
var Sprite = PIXI.Sprite;
var Graphics = PIXI.Graphics;

var loader = PIXI.loader;
var resources = PIXI.loader.resources;

var stage = new Container();
var stageObjects = new Container();
var interfaceObjects = new Container();

var entities = {};

loader
	.add([
		'res/img/grass_0.png',
		'res/img/smiley.png',
		'res/img/smiley2.png'
		])
	.load(setup);

function setup() {
	initSocket();
	var grass = new TilingSprite(resources['res/img/grass_0.png'].texture, view.width, view.height);
	stage.addChild(grass);
	stage.addChild(stageObjects);
	stage.addChild(interfaceObjects);

	gameLoop();
}

function gameLoop() {
	requestAnimationFrame(gameLoop);

	for (var key in entities) {
		if (entities.hasOwnProperty(key)) {
			entities[key].update();
		}
	}

	stageObjects.children.sort(function(a, b) {
		return a.y - b.y
	});

	renderer.render(stage);
}

var keys = [87, 65, 83, 68, 32];
window.addEventListener('keydown', function(event) {
	console.log(event.which);
	if (keys.indexOf(event.which) != -1) {
		var rect = view.getBoundingClientRect();
		socket.emit('keydown', event.which);
	}
});

window.addEventListener('keyup', function(event) {
	if (keys.indexOf(event.which) != -1) {
		var rect = view.getBoundingClientRect();
		socket.emit('keyup', event.which);
	}
});