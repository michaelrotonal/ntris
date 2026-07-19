class GridCell {
	constructor() {
		this.type = 'empty'; 
	}

	makeEmpty() {
		this.type = 'empty'; 
	}

	isEmpty() {
		return this.type == 'empty'; 
	}

	makeGarbage() {
		this.type = 'garbage';
	}

	isGarbage() {
		return this.type == 'garbage'; 
	}

	makePlacedPiece(matrix) {
		this.type = 'placed';
		this.matrix = matrix.map(r => r.slice()); // Deep local copy
	}

	isPlaced() {
		return this.type == 'placed'; 
	}

	makeSD() {
		this.type = 'sd';
	}

	isSD() {
		return this.type == 'sd'; 
	}


}