class Player {
	constructor(cx, position, color, radius) {
		this.cx = cx;

		this._position = position;
		this._color = color;
		this._radius = radius;

        this._frozen = false;
	}

	get position() {return this._position;}
	set position(p) {this._position = p;}
	get color() {return this._color;}
	set color(c) {this._color = c;}
	get frozen() {return this._frozen;}
	set frozen(m) {this._frozen = m;}

	paint() {
		this.cx.save();

		this.cx.lineWidth = "1";

        //paint rim
        this.cx.strokeStyle = this.color.complement().css();
        this.cx.fillStyle = this.color.complement().css();
        this.cx.beginPath();
        this.cx.arc(this.position.x, this.position.y,
            this._radius+3,
            0, 2*Math.PI);
        this.cx.fill();
        this.cx.stroke();

        //paint core
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