import Cell from "./Cell.js"
import Color from "./Color.js"

class Board {
	constructor(cx, width, height, rows, cols, saltMatrix, visibilityMatrix) {
		this.CX = cx;
		this.width = width;
		this.height = height;

		this.rows = rows;
		this.cols = cols;

		//matrix = [[cell, cell, ...], [cell, cell, ...], ...];
		this.matrix = [];
		for (var numRow = 0; numRow < rows; numRow++) {
			var row = [];
			for (var numCol = 0; numCol < cols; numCol++) {
				row.push(new Cell(saltMatrix[numRow][numCol], visibilityMatrix[numRow][numCol]));
			}
			this.matrix.push(row);
		}
	}
	
	get_cell(row, col) {return this.matrix[row][col];}
	set_cell(row, col, newCell) {this.matrix[row][col] = newCell;}

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

	paint() {
		this.CX.save();

	    let cellWidth = document.querySelector('canvas').width / this.cols;
	    let cellHeight = document.querySelector('canvas').height / this.rows;

	    for (let x = 0; x < this.cols; x++) {
	        for (let y = 0; y < this.rows; y++) {
	    		let cVal = this.get_cell(x, y).salt * 32;
	    		let cellColor = new Color(cVal, cVal, cVal);

	            this.CX.lineWidth = "1";
	            this.CX.strokeStyle = cellColor.css();
	            this.CX.fillStyle = cellColor.css();
	            this.CX.beginPath();
	            this.CX.rect(cellWidth * x, cellHeight * y, cellWidth, cellHeight);
	            this.CX.fill();
	            this.CX.stroke();
	        }
	    }
	    this.CX.restore();
	}
};

export default Board;