import {default as mu} from './mathutil.js'; 
import Tetromino from './Tetromino.js'; 
import * as color from './color.js'; 

// color styles: driftOnPaint -- tet drifts while in nextpiece/falling; value comes back to blueprint
//               driftOnMake -- blueprint drifts when tetromino made 

export default class TetrominoBlueprint {
	constructor(settings) {
		this.type = settings.type;
		this.probability = settings.probability || 1; 
		this.colorStyle = settings.colorStyle; 
		this.color = settings.color || ''; 
		this.colorDriftAmount = settings.colorDriftAmount || 5;
		this.matrix = settings.matrix ? settings.matrix.map(r => r.slice()) : null; 
		this.name = settings.name || ''; 

		switch(this.type) {
			case 'static': 
				this.color = settings.color; 
				break;

			// I didn't make this a setting -- this is just to demonstrate what OO can do for you =) 
			case 'random':
				this.density = settings.density || 0.5; 

				if(settings.gridsize) {
					this.gridsizeRows = this.gridsizeCols = this.gridsize = settings.gridsize; 
				} else {
					this.gridsizeRows = settings.gridsizeRows;
					this.gridsizeCols = settings.gridsizeCols;
				}
				// randomness settings: algorithm type, density, etc. 
				this.stability = settings.stability; // Rerolled at game start, blueprint use, slow mutation...? 
				this.randomStyle = settings.randomStyle || 'shotgun'; 
				if(this.stability == 'stable' || this.stability == 'mutate') {
					this.matrix = this.makeRandomMatrix(); 
				}
				
				break;
			case 'mutate':
				this.matrix = settings.matrix.map(r => r.slice());
				this.gridsizeRows = this.matrix.length;
				this.gridsizeCols = this.matrix[0].length; 
				this.chanceToMutate = settings.chanceToMutate || 0.25; 
				this.originalCellCount = mu.countCells(this.matrix); 
				this.mutations = 0; 
				break;

			default: 
				break; 

		}

		if(this.colorStyle == 'driftOnPaint' || this.colorStyle == 'driftOnMake') {
			this.updateColor([mu.getRandomInt(64,255), mu.getRandomInt(64,255), mu.getRandomInt(64,255)]);
			this.colorDriftRate = 50; // ms
			this.lastColorDrift = performance.now(); 
		}
	}

	tetColor() {
		switch(this.colorStyle) {
			case 'static': 
			case 'dynamicFallback':			
				return this.color;

			case 'driftOnPaint':			
			case 'driftOnMake':
				if(this.color) { return this.color; }

			case 'dynamic':
				return null; 

			default:
				return "#FF0000"; // ERROR
		}		
	}

	tetColorStyle() {
		switch(this.colorStyle) {
			case 'static': 
			case 'dynamic':
			case 'dynamicFallback':
				return this.colorStyle;

			case 'driftOnPaint':
				return 'driftOnPaint'; 

			case 'driftOnMake':
				return 'static'; 

			default: 
				return 'dynamicFallback';
		}
	}

	updateColor(rgb) {
		this.baseColor = rgb; 
		this.color = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
	}

	doColorDrift() {
		let now = performance.now();
		if(now - this.lastColorDrift < this.colorDriftRate) { 
			return;
		}

		this.updateColor(color.driftColor(this.baseColor, this.colorDriftAmount)); 
		this.lastColorDrift = now; 
	}

	makeTetromino() {
		if(this.type == 'static' || (this.type == 'random' && this.stability == 'stable')) {
			return new Tetromino({
				matrix: this.matrix, 
				name: this.name,
				color: this.tetColor(),
				colorStyle: this.tetColorStyle(),
				colorDriftAmount: this.colorDriftAmount,
				blueprint: this
			}); 
		}

		if(this.type == 'random' && this.stability == 'unstable') {
			return new Tetromino({
				matrix: this.makeRandomMatrix(), 
				color: this.tetColor(), 
				colorStyle: this.tetColorStyle(),
				colorDriftAmount: this.colorDriftAmount,
				blueprint: this
			});			
		}

		if(this.type == 'mutate') {
			this.mutations++;

			if(Math.random() < this.chanceToMutate && this.mutations > 1) {

				let cellCount = mu.countCells(this.matrix); 
				let addCell = false;
				if(cellCount == 1) {
					addCell = true;
				} else {
					let targetSize = mu.getRandomInt(1, this.originalCellCount + this.mutations/2);
					if(targetSize > cellCount) {
						addCell = true;
					} else {
						addCell = false; 
					}
				}

				let flipBit = (i => 1 - i); 
				if(mu.cellTouchesEdge(this.matrix)) {
					mu.addZeros(this.matrix);
				}

				let i = mu.getRandomInt(0,this.matrix.length-1); 
				let j = mu.getRandomInt(0,this.matrix.length-1); 				

				let tries=0;
				while(true) {
					if(addCell && mu.isAdjacent(this.matrix, i, j)) { break; }
					if((! addCell) && this.matrix[i][j]) { 

						// Try not to disconnect pieces very often
						if(mu.countNeighbors(this.matrix, i, j) == 2) {
							if(Math.random() < 0.1) {
								break; 
							}
						} else {
							break; 
						}
					}

					i = mu.getRandomInt(0,this.matrix.length-1); 
					j = mu.getRandomInt(0,this.matrix.length-1); 

					if(tries++ > 10000) { console.log("Panic! Can't find spot!"); break; } // Shouldn't happen?
				}
				
				this.matrix[i][j] = flipBit(this.matrix[i][j]);
				this.matrix = mu.toCentered(this.matrix);
				while (this.matrix[0].indexOf(1) == -1 && this.matrix[this.matrix.length-1].indexOf(1) == -1 && this.matrix.every(trerr => trerr[0] == 0 && trerr[trerr.length-1] == 0)) {
					this.matrix = this.matrix.slice(1, -1);
					this.matrix = this.matrix.map(nswttt => nswttt.slice(1, -1));
				}
			}

			return new Tetromino({
				matrix: this.matrix, 
				color: this.tetColor(),
				colorStyle: this.tetColorStyle(),
				colorDriftAmount: this.colorDriftAmount,
				blueprint: this
			}); 
		}
	}

	makeRandomMatrix() {

		// Initialize empty grid
		let matrix = []; 
		for(let i = 0; i < this.gridsizeRows; i++) {
			let row = [];
			for(let j = 0; j < this.gridsizeCols; j++) {
				row.push(0);
			}
			matrix.push(row); 
		}

		// Every cell is equal probability
		let madeCells = 0; 
		if(this.randomStyle == 'shotgun') {
			for(let i = 0; i < this.gridsizeRows; i++) {
				for(let j = 0; j < this.gridsizeCols; j++) {
					matrix[i][j] = Math.random() < this.density ? 1 : 0;  
					if(matrix[i][j]) { madeCells++; }
				}
			}

			return mu.toCentered(matrix); 
		}


		// Ant walks density steps orthogonally
		if(this.randomStyle == 'ortho') {
			if(this.stability == 'unstable') {
				this.gridsizeRows = mu.getRandomInt(2,5);
				if(Math.random() < 0.1) { this.gridsizeRows = 7;}
				this.gridsizeCols = this.gridsizeRows;

				matrix = []; 
				for(let i = 0; i < this.gridsizeRows; i++) {
					let row = [];
					for(let j = 0; j < this.gridsizeCols; j++) {
						row.push(0);
					}
					matrix.push(row); 
				}
			}

			let anti = Math.floor((this.gridsizeRows-1)/2);
			let antj = Math.floor((this.gridsizeCols-1)/2);; 

			let squaresToWalk = Math.floor(this.gridsizeRows*this.gridsizeCols * this.density);

			let inGridRow = (i => i > 0 && i < this.gridsizeRows); 
			let inGridCol = (i => i > 0 && i < this.gridsizeCols); 
			while(squaresToWalk) {
				matrix[anti][antj] = 1;

				let dir = ['up', 'down', 'left', 'right'][mu.getRandomInt(0,3)];

				if(dir == 'up' && inGridRow(anti - 1)) {
					anti--; 
				} else if(dir == 'down' && inGridRow(anti + 1)) {
					anti++;
				} else if(dir == 'left' && inGridCol(antj - 1)) {
					antj--;
				} else if(dir == 'right' && inGridCol(antj + 1)) {
					antj++; 
				} else {
					continue;
				}

				squaresToWalk--; 
			}

			return mu.toCentered(matrix); 

		}
	}
}