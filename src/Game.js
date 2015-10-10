import Board from "./Board.js"
import Player from "./Player.js"
import Position from "./Position.js"
import Color from "./Color.js"

class Game {
	constructor (cx, settings, options) {
		this.cx = cx;

		this.settings = settings;
		this.options = options;

		this.keys = {};
		this.activeObject;
		this.clickPosition;

		this.completed = false;
		this.board = new Board(cx, settings['boardWidth'], settings['boardHeight'], settings['rows'], settings['cols'], settings['saltMatrix'], settings['visibilityMatrix']);
		this.salt = new Player(cx, null, settings['saltColor'], settings['playerRadius']);
		this.pepper = new Player(cx, null, settings['pepperColor'], settings['playerRadius']);
		
		this.setListeners();
		this.setBoard();
	}

	setListeners() {
		// general key listeners
		document.body.addEventListener("keydown", function (e) {
	        this.keys[e.keyCode] = true;  //this incorrectly in 'body' context
	        console.log("keydown");
	    }.bind(this));
	    document.body.addEventListener("keyup", function (e) {
	        this.keys[e.keyCode] = false;
	        console.log("keyup");
	        // play/pause with space-bar
	        if (e.keyCode == 32) {
	    		this.options['paused'] = !this.options['paused'];
	    		if (this.options['paused']) {
	    			this.pause;
	    			console.log("paused");
	    		} else {
	    			this.play;
	    			console.log("played");
	    		}
	    	}
	    }.bind(this));

	    // position capture
	    document.querySelector('canvas').addEventListener("click", function (e) {
	        let xPos = e.clientX;
	        let yPos = e.clientY;
	        this.clickPosition = new Position(xPos, yPos);
	        console.log("position captured");
	    }.bind(this));
	}

	setBoard() {
		//todo: have player select positions for each piece then play
	}

	play() {
		this.animation = window.requestAnimationFrame(this.render.bind(this));
		/*
	    this.frames = window.setInterval(function() {this.nextFrame();}, 17);
	    this.phases = window.setInterval(function() {this.nextPhase();}, this.settings['interval']);
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

	render() {
		//todo: paint beacons
		this.board.paint();
		this.salt.paint();
		this.pepper.paint();
		requestAnimationFrame(this.render.bind(this)); //BUG: somehow 'this' changes from game to window
	}

	nextFrame() {
		//todo: update all player and beacon positions, update board saltmatrix
	}

	nextPhase() {
		this.collectSalt;
		this.pepper.movability = true;
	}

	collectSalt() {
		//todo: lower salt level that this.salt.position is on
	}
};

export default Game;