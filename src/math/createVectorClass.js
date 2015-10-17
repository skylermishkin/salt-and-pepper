// third party imports
import zip from 'lodash/array/zip'
// local imports
import mod from 'math/mod'
import sum from 'math/sum'
import product from 'math/product'


function arrayOfZeroes(length) {
    const list = []
    for (var i = 0; i < length; i++) {
        list.push(0)
    }
    return list
}


/**
 * Factory for creating vector classes.
 * @arg {number} length - The dimension (number of entries) for the vector to have.
 * @returns Vector class.
 */
export default (length) => {
    if (!(length > 0 && Math.floor(length) === length)) {
        throw new TypeError(`expected a positive integer, got: ${length}`)
    }

    return class Vector {
        static get length() {
            return length
        }


        constructor(...args) {
            let values = args
            // if no args given
            if (!args.length) {
                // use array of zeroes
                values = arrayOfZeroes(length)
            }
            if (values.length !== length) {
                throw new Error(`expected ${length} args, got: ${values.length} args`)
            }
            if (values.filter(x => !Number.isFinite(x)).length) {
                throw new Error(`expected array of finite numbers, got: ${values}`)
            }
            this._values = values
        }


        toString() {
            return `Vector(${this.values.join(', ')})`
        }


        get length() {
            return length
        }


        get values() {
            return this._values
        }


        get mag() {
            return Math.sqrt(this.magSq)
        }


        get magSq() {
            return this.dot(this)
        }


        plus(other) {
            if (!(other instanceof this.constructor)) {
                throw new TypeError(`expected ${this.constructor.name} instance, got: ${other}`)
            }

            return new this.constructor(
                ...zip(this.values, other.values).map(pair => sum(pair))
            )
        }


        minus(other) {
            if (!(other instanceof this.constructor)) {
                throw new TypeError(`expected ${this.constructor.name} instance, got: ${other}`)
            }

            return new this.constructor(
                ...zip(this.values, other.values.map(x => -x)).map(pair => sum(pair))
            )
        }


        dot(other) {
            return sum(zip(this.values, other.values).map(pair => product(pair)))
        }


        scale(scalar) {
            if (!Number.isFinite(scalar)) {
                throw new TypeError(`expected finite number, got: ${scalar}`)
            }

            return new this.constructor(
                ...this.values.map(x => x * scalar)
            )
        }


        mod(other) {
            return new this.constructor(
                ...zip(this.values, other.values).map(pair => mod(pair[0], pair[1]))
            )
        }
    }
}
