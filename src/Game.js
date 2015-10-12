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
		this.activeObject = undefined;
		this.clickCXPosition = undefined;

		this.completed = false;
		this.board = new Board(cx, settings['boardWidth'], settings['boardHeight'], settings['rows'], settings['cols'], settings['saltMatrix'], settings['visibilityMatrix']);
		this.salt = new Player(cx, new Position(settings['boardWidth']/2, settings['boardHeight']/2), settings['saltColor'], settings['playerRadius']);
		this.pepper = new Player(cx, undefined, settings['pepperColor'], settings['playerRadius']);
	}


	setListeners() {
		// key listeners
		document.body.addEventListener("keydown", function (e) {
	        this.keys[e.keyCode] = true;  //this incorrectly in 'body' context
	        console.log("keydown");  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	    }.bind(this));
	    document.body.addEventListener("keyup", function (e) {
	        this.keys[e.keyCode] = false;
	        console.log("keyup");  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	        // play/pause with space-bar
	        if (e.keyCode == 32) {
	    		this.options['paused'] = !this.options['paused'];
	    		if (this.options['paused']) {
	    			this.pause;
	    			console.log("paused");  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	    		} else {
	    			this.play;
	    			console.log("played");  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	    		}
	    	}
	    }.bind(this));

	    // position capture
	    document.querySelector('canvas').addEventListener("click", function (e) {
	        let xPos = e.clientX;
	        let yPos = e.clientY;
        	let offset = this.getOffset(document.querySelector('canvas'));
	        this.clickCXPosition = new Position(xPos-offset['left'], yPos-offset['top']);
	        console.log("position captured:", this.clickCXPosition);  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	        if (this.activeObject != undefined) {
	        	this.activeObject.position = this.clickCXPosition;
	        	console.log("position set for:", this.activeObject);  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	        }
	    }.bind(this));
	}


    getOffset(el) {  //gets the DOM el offset in the body... should probably be put into a util file
        let _x = 0;
        let _y = 0;
        while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
            _x += el.offsetLeft - el.scrollLeft;
            _y += el.offsetTop - el.scrollTop;
            el = el.offsetParent;
        }
        return { top: _y, left: _x };
    }


	setBoard() {  // eventually set beacons and all pieces
		// for pepper placing
		this.clickCXPosition = undefined;
		this.activeObject = this.pepper;
		alert("Select where Pepper should start.");
	}


	play() {
		this.animation = window.requestAnimationFrame(this.render.bind(this));
		/*
	    this.frames = window.setInterval(function() {this.nextFrame().bind(this);}, 17);
	    this.phases = window.setInterval(function() {this.nextPhase().bind(this);}, this.settings['interval']);
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

		requestAnimationFrame(this.render.bind(this));
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