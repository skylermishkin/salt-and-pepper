// third party imports
import random from 'lodash/number/random'
// local imports
import mod from 'math/mod'
import Color from './Color'


/**
 * Game board.
 * @class
 */
export default class Board {
    constructor({rows, cols}) {
        // TODO: type check here

        this._rows = rows
        this._cols = cols
        this.special = [0, 0]

        // initialize `this._matrix`
        this.clear()
    }


    clear() {
        this._matrix = []
        for (var i = 0; i < this._rows; i++) {
            const row = []
            for (var j = 0; j < this._cols; j++) {
                row.push({
                    dust: 0,
                    visibility: 1,
                })
            }
            this._matrix.push(row)
        }

        return this
    }


    sprinkle(n) {
        for (var k = 0; k < n; k++) {
            this._matrix[random(this._rows - 1)][random(this._cols - 1)] = {
                dust: random(255),
                visibility: 1,    // Skyler: what is this visibility intended to do?
            }
        }

        return this
    }


    leech(position) {
        const i = Math.floor((this._rows - 1) * position.y / 100)
        const j = Math.floor((this._cols - 1) * position.x / 100)

        this.special = [i, j]
        if (i < 0 || i >= this._rows || j < 0 || j >= this._cols) {
            return 0
        }

        const {dust} = this._matrix[i][j]

        if (dust !== 0) {
            this._matrix[i][j].dust = dust - 1
            return 1
        }
        return 0
    }


    draw(context) {
        // dimensions of the entire canvas
        const width = context.canvas.width
        const height = context.canvas.height
        // dimensions of a single cell
        const cellWidth = Math.floor(width / this._cols)
        const cellHeight = Math.floor(height / this._rows)
        // padding necessary to keep rendered cells centered on the canvas
        // due to flooring of cell dimensions
        const paddingX = Math.floor(mod(width, this._cols) / 2)
        const paddingY = Math.floor(mod(height, this._rows) / 2)

        context.fillStyle = 'black'
        context.fillRect(0, 0, width, height)

        for (var i = 0; i < this._rows; i++) {
            for (var j = 0; j < this._cols; j++) {
                const cell = this._matrix[i][j]
                const color = new Color(cell.dust, cell.visibility)
                // location of upper left corner of cell
                const x = paddingX + (j * cellWidth)
                const y = paddingY + (i * cellHeight)

                context.lineWidth = 10
                context.fillStyle = color.toString()
                if (this.special[0] === i && this.special[1] === j) {
                    context.fillStyle = 'red'
                }
                // fill the cell
                context.fillRect(x, y, cellWidth, cellHeight)
            }
        }

        return this
    }
}
