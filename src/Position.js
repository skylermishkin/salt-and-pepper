class Position {
	constructor (x, y) {
		this.x = x;
		this.y = y;
	}
	
	get x () {return this.x;}
	set x (value) {this.x = value;}
	get y () {return this.y;}
	set y (value) {this.y = value;}

	distanceFrom (pos2) {
		var xDist = (pos2.x - this.x) < 0 ? -(pos2.x - this.x) : (pos2.x - this.x);
		var yDist = (pos2.y - this.y) < 0 ? -(pos2.y - this.y) : (pos2.y - this.y);
		return (Math.sqrt(xDist * xDist + yDist * yDist));
	}

	move (xAmount, yAmount) {
		this.x += xAmount;
		this.y += yAmount;
	}

	asArray () {
		return [this.x, this.y];
	}

	asString () {
		return '(' + this.x + ',' + this.y + ')';
	}
};

export default Position;