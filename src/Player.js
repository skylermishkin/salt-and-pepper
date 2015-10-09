class Player {
	constructor(position, color) {
		this._position = position;
		this._color = color;
        this._moveable = true;
	}

	get position() {return this._position;}
	set position(p) {this._position = p;}
	get color() {return this._color;}
	set color(c) {this._color = c;}
	get movability() {return this._moveable;}
	set movability(m) {this._moveable = m;}

	paint() {
		//todo
	}
};

export default Player;