import * as color from './color.js'; 
import * as settings from './settings.js'; 

// Potential color styles:
//   - Fixed/hardcoded; stays the same even if the piece mutates
//   - Dynamic: Always use matrix2color even if the piece changes
//   - DynamicFallback: Use matrix2color if hardcoded isn't available
//   - Fixed/flip: hardcoded flip colors
//   - Drifting: r, g, and b get += rand every paint/piececonstruct/?
//   -   colorDriftAmount = int

export default class Tetromino {
	constructor(options) { // matrix, color, col=0, row=0, name='') {
		if(! options.matrix ) {
			console.log("Warning: Called Tetromino without matrix: " + options);
			options.matrix = [[1]];
		}
		this.matrix = options.matrix.map(r => r.slice()); // Deep local copy
		this.color = options.color || ''; // Possible future improvement: save flipcolor
		this.row = options.row || 0;
		this.col = options.col || 0; 
		this.name = options.name || '';
		this.colorStyle = options.colorStyle || 'dynamicFallback'; 
		this.colorDriftAmount = options.colorDriftAmount; 
		this.blueprint = options.blueprint || null; // In case we want its current life to affect its future life
		this.sticky = (Math.random() * 100 < settings.game.stickyChance);

		let cells = 0;
		for(let i = 0; i < this.matrix.length; i++) {
			for(let j = 0; j < this.matrix.length; j++) {
				if(this.matrix[i][j]) { cells++; }
			}
		}
		if(cells == 0) {
			console.log("Warning: Empty matrix of size " + this.matrix.length + " by " + this.matrix[0].length + ".  Creating monomino.");
			this.matrix = [[1]];
		}
	}

	paint(context, x, y, gridsize, makeColor='', margin, options = {}) {
		let tetcolor = this.color;
		if(makeColor) { tetcolor = makeColor; }
		else {
			switch(this.colorStyle) {
				case 'dynamic':
					tetcolor = this.color = color.matrix2color(this.matrix); 
					break;
				case 'static':
					tetcolor = this.color;
					break;
				case 'dynamicFallback':
					if(! this.color ){
						tetcolor = this.color = color.matrix2color(this.matrix); 
					}
					break;
				case 'driftOnPaint':
					if(this.blueprint) {
						this.blueprint.doColorDrift();
						this.color = this.blueprint.color; 
					}
					break; 
			}
		}

		let flipForDual = options.drawAsDual;
		let gridLeft    = options.gridLeft;
		let gridRight   = options.gridRight;
		let gridWrap    = options.gridWrap; 
		let gridWidth   = gridRight - gridLeft; 
		if (this.sticky) {
			let centerx = x+this.matrix[0].length*gridsize/2;
			let centery = y+this.matrix.length*gridsize/2;
			let stickygradient = context.createRadialGradient(centerx, centery, gridsize/3, centerx, centery, Math.sqrt((this.matrix.length)**2 + (this.matrix[0].length)**2) / 3 * gridsize);
			stickygradient.addColorStop(0, tetcolor);
			stickygradient.addColorStop(1, 'green');
			context.fillStyle = stickygradient;
		} else {
			context.fillStyle = tetcolor; 
		}
		for (let row = 0; row < this.matrix.length; row++) {
		  for (let col = 0; col < this.matrix[row].length; col++) {
		  	if(this.matrix[row][col]) {
		  		// Handle gridwrap for wrap mode
		  		let dx = x + col*gridsize; 
		  		if(gridWrap && gridRight && dx + gridsize > gridRight) {
		  			dx -= gridWidth; 
		  		}

		  		// Handle flip for dual mode 
		  		let dy = y + row*gridsize;
		  		if(flipForDual) { dy = y - row*gridsize; }

		  		context.fillRect(dx, dy, gridsize-margin, gridsize-margin); 
		  	}
		  }
		}
	}
}