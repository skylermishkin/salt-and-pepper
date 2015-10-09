import Board from "./Board.js"
import Player from "./Player.js"
import Position from "./Position.js"
import Color from "./Color.js"

class Game {
	constructor (cx, settings, options) {
		this.CX = cx;
		this.settings = settings;
		this.options = options;
		this.keys = {};
		this.completed = false;
		this.board = new Board(cx, settings['width'], settings['height'], settings['rows'], settings['cols'], settings['saltMatrix'], settings['visibilityMatrix']);
		this.salt = new Player(null, settings['saltColor']);
		this.pepper = new Player(null, settings['pepperColor']);
	}

	play() {
		this.animation = window.requestAnimationFrame(this.render);
		/*
	    this.frames = window.setInterval(function() {nextFrame();}, 17);
	    this.phases = window.setInterval(function() {nextPhase();}, this.settings['interval']);
		*/
	}

	pause() {
		window.cancelAnimationFrame(this.animation);
		this.animation = undefined;
		/*
		window.clearInterval(this.frames);
		this.frames = undefined;
		window.clearInterval(this.phases);  //this will cause a bug where pause->play resets the phase (doesn't track how much of the phase elapsed when paused)
		this.phases = undefined;
		*/
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
		//todo: paint beacons
		this.board.paint();
		this.salt.paint();
		this.pepper.paint();
		requestAnimationFrame(this.render); //BUG: somehow 'this' changes from game to window
	}

	nextFrame() {
		//todo: update all player and beacon positions, update board saltmatrix
	}

	nextPhase() {
		//todo: update Pepper movability
	}
};

export default Game;