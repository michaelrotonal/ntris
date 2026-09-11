import * as color from './color.js';
import * as ts from './tetrominos.js';  

export const EMPTY = 'empty';
export const GARBAGE = 'garbage';
export const PLACED = 'placed';
export const SOCDIST = 'sd'; 
export const UNGARBAGE = 'ungarbage';

export class GridCell {
	constructor(type=EMPTY) {
		this.type = type; 
	}

	makeEmpty() {
		this.type = EMPTY;
		this.color = 'black'; 
	}

	isEmpty() {
		return this.type == EMPTY; 
	}

	makeGarbage() {
		this.type = GARBAGE;
		this.color = '#DCDCDC'
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
		this.color = '#1F1F1F'
	}

	isSD() {
		return this.type == SOCDIST; 
	}

	isUngarbage() {
		return this.type == UNGARBAGE;
	}

	getColor() {
		if (this.color) {
			return this.color;
		}
		if(this.isEmpty()) {
			return 'black';
		}

		if(this.isGarbage() || this.isUngarbage()) {
			return '#DCDCDC';
		}

		if(this.isSD()) {
			return '#1F1F1F';
		}

		if(this.isPlaced()) {
			
			return color.matrix2color(this.matrix); 
			
		}

		return '#FF0000'; // ERROR ERROR ERROR 
	}


}