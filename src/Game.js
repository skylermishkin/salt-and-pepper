import Board from "./Board.js"
import Player from "./Player.js"
import Position from "./Position.js"
import Color from "./Color.js"

class Game {
	constructor (cx, settings, options) {
		this.cx = cx;

		this.settings = settings;
		this.options = options;

		this.listeners = [ // so that bound functions can be removed from listeners
			this.captureKeydown.bind(this),
			this.captureKeyup.bind(this),
			this.capturePosition.bind(this)];
		this.keys = {};
		this.activeObject = null;
		this.clickCXPosition = null;

		this.animation = null;

		this.completed = false;
		this.board = new Board(cx, settings['boardWidth'], settings['boardHeight'], settings['rows'], settings['cols'], settings['saltMatrix'], settings['visibilityMatrix']);
		this.salt = new Player(cx, new Position(settings['boardWidth']/2, settings['boardHeight']/2), settings['saltColor'], settings['playerRadius']);
		this.pepper = new Player(cx, null, settings['pepperColor'], settings['playerRadius']);
	}


	quit() {
		this.pause();
		this.killListeners();
		this.listeners = null;
		this.keys = null;
		this.activeObject = null;
		this.clickCXPosition = null;
		this.board = null;
		this.salt = null;
		this.pepper = null;
	}


	setListeners() {
		document.body.addEventListener("keydown", this.listeners[0], false);
	    document.body.addEventListener("keyup", this.listeners[1], false);
	    document.querySelector('canvas').addEventListener("click", this.listeners[2], false);
	}


	killListeners() {
		document.body.removeEventListener("keydown", this.listeners[0], false);
		document.body.removeEventListener("keyup", this.listeners[1], false);
		document.querySelector('canvas').removeEventListener("click", this.listeners[2], false);
	}


	captureKeydown(e) {
        this.keys[e.keyCode] = true;
        console.log("keydown");  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	}


	captureKeyup(e) {
		this.keys[e.keyCode] = false;
        console.log("keyup");  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        // play/pause with space-bar
        if (e.keyCode == 32) {
    		this.options['paused'] = !this.options['paused'];
    		if (this.options['paused']) {
    			this.pause();
    			console.log("paused");  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    		} else {
    			this.play();
    			console.log("played");  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    		}
    	}
	}


	capturePosition(e) {
		let xPos = e.clientX;
        let yPos = e.clientY;
    	let offset = this.getOffset(document.querySelector('canvas'));
        this.clickCXPosition = new Position(xPos-offset['left'], yPos-offset['top']);
        console.log("position captured:", this.clickCXPosition);  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        if (this.activeObject != null && this.activeObject.frozen == false) {
        	if (this.activeObject == this.pepper) {
        		this.settings['moves'] += 1;
        		document.getElementById('moves').innerHTML = this.settings['moves'];
        	}
        	this.activeObject.position = this.clickCXPosition;
        	this.activeObject.frozen = true;
        	console.log("position set for:", this.activeObject);  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        }
	}


    getOffset(el) {  // gets the DOM element offset in the body... should probably be put into a util file
        let _x = 0;
        let _y = 0;
        while(el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
            _x += el.offsetLeft - el.scrollLeft;
            _y += el.offsetTop - el.scrollTop;
            el = el.offsetParent;
        }
        return {top: _y, left: _x};
    }


	setBoard() {  // eventually set beacons and all pieces
		// set pepper
		this.clickCXPosition = null;
		this.activeObject = this.pepper;
		alert("Select where Pepper should start.");
	}


	play() {
		if (this.pepper.position != null) {  //nothing to animate if pepper not on board
			console.log("salt start:", this.salt.position);  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
			console.log("pepper start:", this.pepper.position);  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
			this.animation = window.requestAnimationFrame(this.render.bind(this));
			/*
		    this.frames = window.setInterval(function() {this.nextFrame().bind(this);}, 17);
		    this.phases = window.setInterval(function() {this.nextPhase().bind(this);}, this.settings['interval']);
			*/
		}
	}


	pause() {
		window.cancelAnimationFrame(this.animation);
		this.animation = null;
		/*
		window.clearInterval(this.frames);
		this.frames = null;
		window.clearInterval(this.phases);  //this will cause a bug where pause->play resets the phase (doesn't track how much of the phase elapsed when paused)
		this.phases = null;
		*/
	}


	render() {
		console.log("rendered");  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		//cover all
		this.cx.lineWidth = "1";
        this.cx.strokeStyle = "black";
        this.cx.fillStyle = "black";
        this.cx.beginPath();
        this.cx.rect(0, 0, this.settings['boardWidth'], this.settings['boardHeight']);
        this.cx.fill();
        this.cx.stroke();

		//paint items; todo: paint beacons
		this.board.paint();
		this.salt.paint();
		this.pepper.paint();

		this.animation = requestAnimationFrame(this.render.bind(this));
	}


	nextFrame() {
		//todo: update all player and beacon positions
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