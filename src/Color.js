class Color {
	constructor (red, green, blue) {
		this.red = red;
		this.green = green;
		this.blue = blue;
	}
	
	get red () {return this.red;}
	set red (value) {this.red = value;}
	get green () {return this.green;}
	set green (value) {this.green = value;}
	get blue () {return this.blue;}
	set blue (value) {this.blue = value;}
	get values () {return [this.red, this.green, this.blue];}
	set values ([r,g,b]) {	this.red = r;
							this.green = g;
							this.blue = b;
						}

	brighten (amount) {  //adds amount to each color value
		var newValues = [];
		for (var i = 0; i < 3; i++) {
			newValues[i] = this.values[i] + amount;
		}
		this.values(newValues);
	}

	addRed (amount) {
		this.red += amount;
	}

	addGreen (amount) {
		this.green += amount;
	}

	addBlue (amount) {
		this.blue += amount;
	}

	standardize () {  //ensures colors are in range 0->255
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

	asString () {
		return 'rgb(' + this.red + ',' + this.green + ',' + this.blue + ')';
	}
};

export default Color;