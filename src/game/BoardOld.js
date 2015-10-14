// local imports
import Cell from './Cell'
import Color from './Color'


/**
 * Game board.
 * @class
 */
class Board {
	constructor(width, height, rows, cols, saltMatrix, visibilityMatrix) {
		this.width = width
		this.height = height

		this.rows = rows
		this.cols = cols

		//matrix = [[cell, cell, ...], [cell, cell, ...], ...]
		this.matrix = []
		for (var numRow = 0; numRow < rows; numRow++) {
			var row = []
			for (var numCol = 0; numCol < cols; numCol++) {
				row.push(new Cell(saltMatrix[numRow][numCol], visibilityMatrix[numRow][numCol]))
			}
			this.matrix.push(row)
		}
	}


	getCell(row, col) {return this.matrix[row-1][col-1];}
	setCell(row, col, newCell) {this.matrix[row-1][col-1] = newCell;}

	getCellByCoordinates(x, y) {  //BUGGY
		let cellWidth = this.width / this.cols;
	    let cellHeight = this.height / this.rows;

	    if (x > 0 && y > 0 && x < this.width && y < this.height) { // if salt is on the board
	    	let row, col;
		    for (let i = 1; i <= this.rows; i++) {
		    	if (y < i*cellHeight) {
		    		row = i;
		    		break;
		    	}
		    }
	    	for (let j = 1; j <= this.cols; j++) {
	    		if (x < j*cellWidth) {
	    			col = j;
	    			break;
	    		}
	    	}
	    	return this.getCell(row, col);
		} else return null; // when salt is off the board
	}

	fill(salt, visibility) {
		for (var numRow = 0; numRow < this.rows; numRow++) {
			for (var numCol = 0; numCol < this.cols; numCol++) {
				this.matrix[numRow][numCol] = new Cell(salt, visibility);
			}
		}
	}

	deplete() {  //makes all cells peppered with 0 visibility
		this.fill(0, 0);
	}

	saturate() {  //makes all cells salted (8) with 1 visibility
		this.fill(8, 1);
	}
	showAll() {
		for (var numRow = 0; numRow < this.rows; numRow++) {
			for (var numCol = 0; numCol < this.cols; numCol++) {
				this.get_cell(numRow, numCol).visibility = 1;
			}
		}
	}
	hideAll() {
		for (var numRow = 0; numRow < this.rows; numRow++) {
			for (var numCol = 0; numCol < this.cols; numCol++) {
				this.get_cell(numRow, numCol).visibility = 0;
			}
		}
	}


	paint(context) {  // does not include visibility
		context.save();

	    let cellWidth = this.width / this.cols;
	    let cellHeight = this.height / this.rows;

	    for (let row = 1; row <= this.rows; row++) {
	        for (let col = 1; col <= this.cols; col++) {
	    		let cVal = this.getCell(row, col).salt * 32; // 8-bit salting
	    		let cellColor = new Color(cVal);

	            context.lineWidth = "1";
	            context.strokeStyle = cellColor.css();
	            context.fillStyle = cellColor.css();
	            context.beginPath();
	            context.rect(cellHeight * (col-1), cellWidth * (row-1), cellWidth, cellHeight);
	            context.fill();
	            context.stroke();
	        }
	    }

	    context.restore();
	}
};

export default Board;
