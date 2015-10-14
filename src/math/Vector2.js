// local imports
import createVectorClass from './createVectorClass'


/**
 * Two dimensional vector.
 * @class
 */
export default class Vector2 extends createVectorClass(2) {
	get x() {
		return this.values[0]
	}


	set x(x) {
		if (!Number.isFinite(x)) {
			throw new TypeError(`expected finite number, got: ${x}`)
		}

		const newValues = this.values
		newValues[0] = x

		this.values = newValues
	}


	get y() {
		return this.values[1]
	}


	set y(y) {
		if (!Number.isFinite(y)) {
			throw new TypeError(`expected finite number, got: ${y}`)
		}

		const newValues = this.values
		newValues[1] = y

		this.values = newValues
	}
}
