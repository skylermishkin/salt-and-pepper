class Beacon {
    constructor (position, color) {
        this.position = position;
        this.color = color;
    }

    get position () {return this.position;}
    set position (newPosition) {this.position = newPosition;}
    get color () {return this.color;}
    set color (newColor) {this.color = newColor;}
};

export default Beacon;



// erase this file.  a beacon is just a {position, color} hash
