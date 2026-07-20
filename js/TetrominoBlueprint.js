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

		switch(this.type) {
			case 'static': 
				this.matrix = settings.matrix.map(r => r.slice()); 
				this.color = settings.color; 
				this.name = settings.name; 
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
				this.chanceToMutate = settings.chanceToMutate || 0.5; 
				break;

			default: 
				break; 

		}

		if(this.colorStyle == 'driftOnPaint' || this.colorStyle == 'driftOnMake') {
			this.updateColor([mu.getRandomInt(64,255), mu.getRandomInt(64,255), mu.getRandomInt(64,255)]);
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
			if(Math.random() < this.chanceToMutate) {
				let flipBit = (i => 1 - i); 
				this.matrix.push(new Array(this.matrix[0].length).fill(0));
				this.matrix.unshift(new Array(this.matrix[0].length).fill(0));
				for (let i = 0; i < this.matrix.length; i++) {
					this.matrix[i].push(0);
					this.matrix[i].unshift(0);
				}
				let i = mu.getRandomInt(0,this.matrix.length-1); 
				let j = mu.getRandomInt(0,this.matrix.length-1); 

				let clamp = ((matrix, i) => i < 0 ? 0 : i >= matrix.length ? matrix.length-1 : i);
				let notAdjacentOrOn = ((matrix, a, b) => matrix[a][b] == 0 && 
					                                     matrix[clamp(matrix, a+1)][clamp(matrix[0], b)] == 0 &&
					                                     matrix[clamp(matrix, a-1)][clamp(matrix[0],b)] == 0 &&
					                                     matrix[clamp(matrix, a)][clamp(matrix[0],b+1)] == 0 &&
					                                     matrix[clamp(matrix, a)][clamp(matrix[0],b-1)] == 0);

				// Special case: don't flip off monomino do doo do do do 
				let cellCount = this.matrix.reduce((acc,row) => acc + row.reduce((acc2, cell) => cell ? acc2 + 1 : acc2, 0), 0); 
				while( (cellCount < 2 && this.matrix[i][j]) || notAdjacentOrOn(this.matrix, i, j)) {
					i = mu.getRandomInt(0,this.matrix.length-1); 
					j = mu.getRandomInt(0,this.matrix.length-1); 
				}
				
				this.matrix[i][j] = flipBit(this.matrix[i][j]);
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

			console.log("Shotgun matrix " + this.gridsizeRows + " x " + this.gridsizeCols + " density " + this.density + " made " + madeCells + " cells.");
			return matrix; 
		}


		// Ant walks density steps orthogonally
		if(this.randomStyle == 'ortho') {
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

			return matrix; 

		}
	}
}