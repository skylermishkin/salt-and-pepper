// local imports
import createVectorClass from './createVectorClass'


/**
 * Two dimensional vector.
 * @class
 */
export default class Vector2 extends createVectorClass(2) {
    get x() {
        return this._values[0]
    }


    get y() {
        return this._values[1]
    }


    rotated(angle) {
        if (!Number.isFinite(angle)) {
            throw new TypeError(`expected finite number, got: ${angle}`)
        }

        const x = this.x
        const y = this.y
        const cos = Math.cos(angle)
        const sin = Math.sin(angle)

        return new this.constructor((x * cos) - (y * sin), (x * sin) + (y * cos))
    }
}
