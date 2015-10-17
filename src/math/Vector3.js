// local imports
import createVectorClass from './createVectorClass'


/**
 * Three dimensional vector.
 * @class
 */
export default class Vector3 extends createVectorClass(3) {
    get x() {
        return this._values[0]
    }


    get y() {
        return this._values[1]
    }


    get z() {
        return this._values[2]
    }


    // rotated(other, angle) {
    //     if (!(other instanceof this.constructor)) {
    //         throw new TypeError(`expected ${this.constructor.name} instance, got: ${other}`)
    //     }
    //     if (!Number.isFinite(angle)) {
    //         throw new TypeError(`expected finite number, got: ${angle}`)
    //     }
    //
    //     // TODO: write this
    // }
}
