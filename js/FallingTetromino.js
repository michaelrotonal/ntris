class FallingTetromino {
	constructor(matrix, color, col=0, row=0) {
		this.matrix = matrix.map(r => r.slice()); // Deep local copy
		this.color = color;
		this.row = row;
		this.col = col; 
	}

	paint(ctx, x, y, gridsize) {

	}
}