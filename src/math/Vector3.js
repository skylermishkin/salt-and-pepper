// local imports
import createVectorClass from './createVectorClass'


/**
 * Three dimensional vector.
 * @class
 */
export default class Vector3 extends createVectorClass(3) {
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


	get z() {
		return this.values[2]
	}


	set z(z) {
		if (!Number.isFinite(z)) {
			throw new TypeError(`expected finite number, got: ${z}`)
		}

		const newValues = this.values
		newValues[2] = z

		this.values = newValues
	}
}
