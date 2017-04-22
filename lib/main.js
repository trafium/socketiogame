module.exports = () => {
	function main() {
		for (var key in entities) {
			if (entities.hasOwnProperty(key)) {
				entities[key].update();
			}
		}

		io.to('main').emit('updateEntities', entities);
		setTimeout(main, 13.666);
	}
	main();
}