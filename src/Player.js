class Player {
	constructor(cx, position, xVelocity, yVelocity, color, radius) {
		this.cx = cx;

		this._position = position;
        this._xvelocity = xVelocity;
        this._yvelocity = yVelocity;
		this._color = color;
		this._radius = radius;

        this._frozen = false;
	}

	get position() {return this._position;}
	set position(p) {this._position = p;}

    get xVelocity() {return this._xvelocity;}
    set xVelocity(v) {this._xvelocity = v;}

    get yVelocity() {return this._yvelocity;}
    set yVelocity(v) {this._yvelocity = v;}

	get color() {return this._color;}
	set color(c) {this._color = c;}

	get frozen() {return this._frozen;}
	set frozen(m) {this._frozen = m;}

    move(x,y) {
        this._position.move(x,y);
    }

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