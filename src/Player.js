class Player {
	constructor(position, color) {
		this.position = position;
		this.color = color;
        this.moveable = true
	}
	
	get position() {return this.position;}
	set position(newPosition) {this.position = newPosition;}
	get color() {return this.color;}
	set color(newColor) {this.color = newColor;}
};

export default Player;