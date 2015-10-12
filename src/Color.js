class Color {
	constructor (red, green, blue) {
		this._red = red || 0; // defaults to black
		this._green = green != undefined ? green : this._red;
		this._blue = blue != undefined ? blue : this._red;
	}
	
	get red() {return this._red;}
	set red(value) {this._red = value;}
	get green() {return this._green;}
	set green(value) {this._green = value;}
	get blue() {return this._blue;}
	set blue(value) {this._blue = value;}
	get values() {return [this._red, this._green, this._blue];}
	set values(vals) {	this._red = vals[0];
							this._green = vals[1];
							this._blue = vals[2];
						}

	brighten(amount) {  //adds amount to each color value
		var newValues = [];
		for (var i = 0; i < 3; i++) {
			newValues[i] = this.values[i] + amount;
		}
		this.values(newValues);
	}

	addRed(amount) {
		this._red += amount;
	}

	addGreen(amount) {
		this._green += amount;
	}

	addBlue(amount) {
		this._blue += amount;
	}

	standardize() {  //ensures colors are in range 0->255
		var newValues = [];
		for (var i = 0; i < 3; i++) {
			if (this.values[i] > 255) {
				newValues[i] = 255;
			} else if (this.values[i] < 0) {
				newValues[i] = 0;
			}
		}
		this.values(newValues);
	}

	complement() {
		var newValues = [];
		for (var i = 0; i < 3; i++) {
			newValues[i] = 255 - this.values[i];
		}
		return new Color(newValues[0], newValues[1], newValues[2]);
	}

	css() {
        return "rgb(" + 
        	Math.round(this._red) + 
        	"," + 
        	Math.round(this._green) + 
        	"," + 
        	Math.round(this._blue) + ")";
	}
};

export default Color;