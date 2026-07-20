import * as color from './color.js';
import * as ts from './tetrominos.js';  

export const EMPTY = 'empty';
export const GARBAGE = 'garbage';
export const PLACED = 'placed';
export const SOCDIST = 'sd'; 

export class GridCell {
	constructor(type=EMPTY) {
		this.type = type; 
	}

	makeEmpty() {
		this.type = EMPTY; 
	}

	isEmpty() {
		return this.type == EMPTY; 
	}

	makeGarbage() {
		this.type = GARBAGE;
	}

	isGarbage() {
		return this.type == GARBAGE; 
	}

	makePlacedPiece(matrix, name='', color=null) {
		this.type = PLACED;
		this.matrix = matrix.map(r => r.slice()); // Deep local copy
		this.name = name;
		this.color = color; 
	}

	isPlaced() {
		return this.type == PLACED; 
	}

	makeSD() {
		this.type = SOCDIST;
	}

	isSD() {
		return this.type == SOCDIST; 
	}

	getColor() {
		if(this.isEmpty()) {
			return 'black';
		}

		if(this.isGarbage()) {
			return '#DCDCDC';
		}

		if(this.isSD()) {
			return '#1F1F1F';
		}

		if(this.isPlaced()) {
			if(this.color) {
				return this.color; 
			}
			
			return color.matrix2color(this.matrix); 
			
		}

		return '#FF0000'; // ERROR ERROR ERROR 
	}


}