class Position {
	constructor(x, y) {
		this._x = x;
		this._y = y;
	}
	
	get x() {return this._x;}
	set x(value) {this._x = value;}
	get y() {return this._y;}
	set y(value) {this._y = value;}

	distanceFrom(pos2) {
		var xDist = (pos2.x - this._x) < 0 ? -(pos2.x - this._x) : (pos2.x - this.x);
		var yDist = (pos2.y - this._y) < 0 ? -(pos2.y - this._y) : (pos2.y - this.y);
		return (Math.sqrt(xDist * xDist + yDist * yDist));
	}

	move(xAmount, yAmount) {
		this._x += xAmount;
		this._y += yAmount;
	}

	asArray() {
		return [this._x, this._y];
	}

	asString() {
		return '(' + this._x + ',' + this._y + ')';
	}
};

export default Position;