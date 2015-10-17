// local imports
import Vector2 from 'math/Vector2'
import Color from 'game/Color'


/**
 * Player character.
 * @class
 */
export default class Player {
    constructor({position, velocity, color, mass}) {
        if (!(position instanceof Vector2)) {
            throw new Error(`expected vector2 instance, got: ${position}`)
        }
        if (!(velocity instanceof Vector2)) {
            throw new Error(`expected vector2 instance, got: ${velocity}`)
        }
        if (!(color instanceof Color)) {
            throw new Error(`expected color instance, got: ${color}`)
        }
        if (!Number.isFinite(mass)) {
            throw new Error(`expected finite integer, got: ${mass}`)
        }

        this.position = position
        this.velocity = velocity
        this.color = color
        this.mass = mass
    }


    /**
     * Shifts the player's position by the given displacement.
     */
    move(displacement) {
        if (!(displacement instanceof Vector2)) {
            throw new Error(`expected vector2 instance, got: ${displacement}`)
        }

        this.position = this.position.plus(displacement)

        return this
    }
}
