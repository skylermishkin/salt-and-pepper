import Cell from "./Cell.js"
import Color from "./Color.js"

class Board {
	constructor(rows, cols, colorMatrix, visibilityMatrix) {
		this.rows = rows;
		this.cols = cols;

		//matrix = [[cell, cell, ...], [cell, cell, ...], ...];
		this.matrix = [];
		for (var numRow = 0; numRow < rows; numRow++) {
			var row = [];
			for (var numCol = 0; numCol < cols; numCol++) {
				row.push(new Cell(colorMatrix[numRow][numCol], visibilityMatrix[numRow][numCol]));
			}
			matrix.push(row);
		}
	}
	
	get_cell(row, col) {return this.matrix[row][col];}
	set_cell(row, col, newCell) {this.matrix[row][col] = newCell;}
	
	get matrix() {return this.matrix;}
	get height() {return this.rows;}
	get width() {return this.cols;}

	fill(color, visibility) {
		for (var numRow = 0; numRow < this.rows; numRow++) {
			for (var numCol = 0; numCol < this.cols; numCol++) {
				this.matrix[numRow][numCol] = new Cell(color, visibility);
			}
		}
	}

	deplete() {  //makes all cells black with 0 visibility
		this.fill(new Color(0,0,0), 0);
	}

	saturate() {  //makes all cells white with 1 visibility
		this.fill(new Color(255,255,255), 1);
	}
};

export default Board;