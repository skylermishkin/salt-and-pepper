import Board from "./Board.js"
import Player from "./Player.js"
import Position from "./Position.js"
import Color from "./Color.js"

class Game {
	constructor (settings, options) {
		this.settings = settings;
		this.options = options;
		this.keys = {};
		this.completed = false;
		this.board = new Board(settings['rows'], settings['cols'], settings['colorMatrix'], settings['initVisibility']);
		this.salt = new Player(null, settings['saltColor']);
		this.pepper = new Player(null, settings['pepperColor']);
	}

	play() {
		this.animation = window.requestAnimationFrame(this.render);
	    this.frames = window.setInterval(function() {nextFrame();}, 17);
	    this.phases = window.setInterval(function() {nextPhase();}, this.settings['interval']);
	}

	pause() {
		window.cancelAnimationFrame(this.animation);
		this.animation = undefined;
		window.clearInterval(this.frames);
		this.frames = undefined;
		window.clearInterval(this.phases);
		this.phases = undefined;
	}

	setListeners() {
		document.body.addEventListener("keydown", function (e) {
	        this.keys[e.keyCode] = true;
	    });
	    document.body.addEventListener("keyup", function (e) {
	        this.keys[e.keyCode] = false;
	    });
	}

	render() {
		//todo: render board, render beacons, render player

		requestAnimationFrame(this.render);
	}

	nextFrame() {
		//todo: update all player and beacon positions, update board saltmatrix
	}

	nextPhase() {
		//todo: update Pepper movability
	}
};

export default Game;