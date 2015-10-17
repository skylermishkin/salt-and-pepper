// third party imports
import random from 'lodash/number/random'
// local imports
import Color from 'game/Color'


/**
 * 2D array of Colors.
 * @class
 */
export default class ColorMatrix {
    constructor({rows, cols}) {
        if (!(rows > 0 && Number.isFinite(rows) && cols > 0 && Number.isFinite(cols))) {
            throw new Error(`expected positive, finite integer, got: ${rows}, ${cols}`)
        }

        this._rows = rows
        this._cols = cols

        // initialize `this._matrix`
        this.clear()
    }


    get rows() {
        return this._rows
    }


    get cols() {
        return this._cols
    }


    /**
     * Reset all cells to given color.  Defaults to black.
     */
    clear(color = new Color()) {
        if (!(color instanceof Color)) {
            throw new Error(`expected color instance, got: ${color}`)
        }

        this._matrix = []

        for (var i = 0; i < this._rows; i++) {
            const row = []
            for (var j = 0; j < this._cols; j++) {
                row.push(color.clone())
            }
            this._matrix.push(row)
        }

        return this
    }


    /**
     * Sprinkles given number of random grey bits onto the board.
     * Defaults to just one sprinkle.
     */
    sprinkle(numSprinkles = 1) {
        for (var k = 0; k < numSprinkles; k++) {
            this._matrix
                [random(this.rows - 1)]
                [random(this.cols - 1)] = new Color(random(255))
        }

        return this
    }


    /**
     * Return a clone of the color at the given indices.
     */
    at(i, j) {
        if (!(i >= 0 && i < this.rows && j >= 0 && j < this.cols)) {
            throw new Error(
                `expected integers in [0, ${this.rows}) and [0, ${this.cols}],`
                    + ` got: ${i} and ${j}`
            )
        }

        return this._matrix[i][j].clone()
    }


    /**
     * Sucks color out of the cell at the given indices.  Returns 1 if any
     * color was sucked, 0 otherwise.
     */
    leech(i, j) {
        if (!(i >= 0 && i < this.rows && j >= 0 && j < this.cols)) {
            throw new Error(
                `expected integers in [0, ${this.rows}) and [0, ${this.cols}],`
                    + ` got: ${i} and ${j}`
            )
        }

        const color = this._matrix[i][j]

        if (color.r !== 0 || color.g !== 0 || color.b !== 0) {
            this._matrix[i][j] = color.minus(new Color(1, 1, 1))

            return 1
        }

        return 0
    }


    /**
     * Maps over the flattened matrix using the given callback to determine
     * the mapping.  The mapping will be passed `{color, i, j}, index` at each
     * cell.
     */
    map(fn) {
        // reduce over the rows in the matrix
        return this._matrix.reduce(
            // return the result of reducing over the colors in each row
            ({result, index}, row, i) => row.reduce(
                // return the accumulator with the mapped color and the next key
                ({result: _result, index: _index}, color, j) => ({
                    result: _result.concat(fn({color, i, j}, _index)),
                    index: _index + 1,
                }),
                // take the outer accumulator as the initial value
                {result, index}
            ),
            // start with an empty array and zero based index
            {result: [], index: 0}
        ).result
    }
}
