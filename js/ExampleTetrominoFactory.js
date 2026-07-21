import Tetromino from './Tetromino.js'; 

export default class ExampleTetrominoFactory {
	constructor(nextPieces, tfsettings={}) {
		this.nextPieces = nextPieces;
		this.tetrominoSequence = [];
	}

	getNextTetromino() {		
		while(this.tetrominoSequence.length <= this.nextPieces) {

			// Literally ANY method of creating tetrominoes goes here
			// I chose smiley faces

			this.tetrominoSequence.push(new Tetromino({
				matrix: [[0,1,0,1,0],
				         [0,0,0,0,0],
				         [1,0,0,0,1],
				         [0,1,1,1,0],
				         [0,0,0,0,0]],
				color: 'yellow',
				colorStyle: 'static'
			}));
		}

		return this.tetrominoSequence.splice(0,1)[0]; 
	}

	getLookahead() {
		return this.tetrominoSequence; 
	}
}