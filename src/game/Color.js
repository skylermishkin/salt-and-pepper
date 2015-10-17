// local imports
import Vector3 from 'math/Vector3'


function trim(x) {
    if (!Number.isFinite(x)) {
        throw new Error(`expected finite number, got: ${x}`)
    }
    if (x > 255) {
        return 255
    }
    if (x < 0) {
        return 0
    }
    return x
}


/**
 * An rgb color.
 * @class
 */
export default class Color extends Vector3 {
    constructor(...args) {
        let r, g, b, a
        // if no arguments passed
        if (!args.length) {
            // default to black
            r = 0
            g = 0
            b = 0
            a = 1
        // if one arg passed
        } else if (args.length === 1) {
            // set it to that value of grey
            r = args[0]
            g = args[0]
            b = args[0]
            // and default opacity to 1
            a = 1
        // if two args passed
        } else if (args.length === 2) {
            // use first arg for grey value
            r = args[0]
            g = args[0]
            b = args[0]
            // use second arg for opacity value
            a = args[1]
        // if three args passed
        } else if (args.length === 3) {
            // use them as rgb
            r = args[0]
            g = args[1]
            b = args[2]
            // and default opacity to 1
            a = 1
        // if four args passed
        } else if (args.length === 4) {
            // use them as rgba
            r = args[0]
            g = args[1]
            b = args[2]
            a = args[3]
        }

        super(r, g, b)

        if (a < 0 || a > 1) {
            throw new Error('expected number in [0, 1], got: ${a}')
        }

        this._a = a
    }


    toString() {
        return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`
    }


    get r() {
        return this._values[0]
    }


    get g() {
        return this._values[1]
    }


    get b() {
        return this._values[2]
    }


    get a() {
        return this._a
    }


    get complement() {
        return new this.constructor(...this.values.map(x => 255 - x), this._a)
    }


    plus(other) {
        return new this.constructor(
            ...super.plus(other).values.map(trim),
            this._a
        )
    }


    minus(other) {
        return new this.constructor(
            ...super.minus(other).values.map(trim),
            this._a
        )
    }
}
