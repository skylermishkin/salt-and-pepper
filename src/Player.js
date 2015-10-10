class Player {
	constructor(cx, position, color, radius) {
		this.cx = cx;

		this._position = position;
		this._color = color;
		this._radius =radius;

        this._moveable = true;
	}

	get position() {return this._position;}
	set position(p) {this._position = p;}
	get color() {return this._color;}
	set color(c) {this._color = c;}
	get movability() {return this._moveable;}
	set movability(m) {this._moveable = m;}

	paint() {
		this.cx.save();

		this.cx.lineWidth = "1";
        this.cx.strokeStyle = this.color.css();
        this.cx.fillStyle = this.color.css();
        this.cx.beginPath();
        this.cx.arc(this.position.x, this.position.y,
        	this._radius,
        	0, 2*Math.PI);
        this.cx.fill();
        this.cx.stroke();

	    this.cx.restore();
	}
};

export default Player;