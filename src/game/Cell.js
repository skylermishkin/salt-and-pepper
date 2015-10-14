/**
 * A single cell on the game board.
 * @class
 */
export default class Cell {
	constructor(salt, visibility) {
		if (!(salt >= 0 && salt <= 8)) {
			throw new Error(`expected number in [0, 8], got: ${salt}`)
		}
		if (!(visibility >= 0 && visibility <= 1)) {
			throw new Error(`expected number in [0, 8], got: ${visibility}`)
		}
		this.salt = salt
		this.visibility = visibility
	}


	get salt() {
		return this._salt
	}


	set salt(salt) {
		this._salt = salt
	}


	get visibility() {
		return this._visibility
	}


	set visibility(visibility) {
		this._visibility = visibility
	}


	lowerSalt(amount) {
		this._salt -= amount
	}


	increaseSalt(amount) {
		this._salt += amount
	}
}
