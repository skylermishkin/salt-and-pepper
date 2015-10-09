class Cell {
	constructor (salt, visibility) {
		//0 <= salt <= 8
		this._salt = salt;
		//0 <= visibility <= 1
		this._visibility = visibility;
	}

	get salt() {return this._salt;}
	set salt(s) {this._salt = s;}
	get visibility() {return this._visibility;}
	set visibility(v) {this._visibility = v;}

	lower_salt(amount) {this.salt -= amount;}
	increase_salt(amount) {this.salt += amount;}
};

export default Cell;