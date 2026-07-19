class GridCell {
	constructor() {
		this.type = 'empty'; 
	}

	makeEmpty() {
		this.type = 'empty'; 
	}

	makeGarbage() {
		this.type = 'garbage';
	}

	makePiece(matrix) {
		this.type = 'placedPiece';
		this.matrix = matrix.map(r => r.slice()); // Deep local copy
	}

	makeSD() {
		this.type = 'socialdistancer';
	}
}