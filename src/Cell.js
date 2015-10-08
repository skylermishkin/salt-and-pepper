class Cell {
	constructor (color, visibility) {
		this.color = color;
		//0 <= visibility <= 1;
		this.visibility = visibility;
	}
	
	get color () {return this.color;}
	set color (newColor) {this.color = newColor;}
	get visibility () {return this.visibility;}
	set visibility (newVisibility) {this.visibility = newVisibility;}
};

export default Cell;