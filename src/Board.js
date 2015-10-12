import Cell from "./Cell.js"
import Color from "./Color.js"

class Board {
	constructor(cx, width, height, rows, cols, saltMatrix, visibilityMatrix) {
		this.cx = cx;
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
		this.cx.save();

	    let cellWidth = this.width / this.cols;
	    let cellHeight = this.height / this.rows;

	    for (let x = 0; x < this.cols; x++) {
	        for (let y = 0; y < this.rows; y++) {
	    		let cVal = this.get_cell(x, y).salt * 32;
	    		let cellColor = new Color(cVal);

	            this.cx.lineWidth = "1";
	            this.cx.strokeStyle = cellColor.css();
	            this.cx.fillStyle = cellColor.css();
	            this.cx.beginPath();
	            this.cx.rect(cellWidth * x, cellHeight * y, cellWidth, cellHeight);
	            this.cx.fill();
	            this.cx.stroke();
	        }
	    }
	    
	    this.cx.restore();
	}
};

export default Board;