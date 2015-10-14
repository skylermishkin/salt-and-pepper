/**
 * Player character.
 * @class
 */
export default class Player {
	constructor({position, velocity, color, radius, isFrozen = false}) {
		this.position = position
        this.velocity = velocity
		this.color = color
		this.radius = radius
        this.isFrozen = isFrozen
	}


    move(vector) {
        this.position = this.position.plus(vector)

		return this
    }


	draw(context) {
        // dimensions of the entire canvas
        const width = context.canvas.width
        const height = context.canvas.height
		// player position in canvas dimension units
		const x = width * this.position.x / 100
		const y = height * this.position.y / 100

		context.lineWidth = 3
        context.strokeStyle = this.color.complement.toString()
        context.fillStyle = this.color.toString()
        context.beginPath()
        context.arc(x, y, this.radius, 0, 2 * Math.PI)
        context.fill()
        context.stroke()

		return this
	}
}
