import {default as mu} from './mathutil.js'; 

class TetrominoBlueprint {
	constructor(settings) {
		this.type = settings.type;

		switch(this.type) {
			case 'static': 
				this.matrix = settings.matrix.map(r => r.slice()); 
				this.color = settings.color; 
				break;

			// I didn't make this a setting -- this is just to demonstrate what OO can do for you =) 
			case 'random':
				this.gridsize = settings.gridsize; 
				// randomness settings: algorithm type, density, etc. 
				this.stability = settings.stability; // Rerolled at game start, blueprint use, slow mutation...? 
				this.randomStyle = settings.randomStyle || 'shotgun'; 
				if(this.stability == 'stable' || this.stability == 'mutate') {
					this.matrix = this.makeRandomMatrix(); 
				}
				break;

			default: 
				break; 
		}
	}

	makeFallingTetromino() {
		if(this.type == 'static' || (this.type == 'random' && this.stability == 'stable')) {
			return new FallingTetomino(this.matrix, this.color); 
		}

		if(this.type == 'random' && this.stability == 'unstable') {
			return new FallingTetomino(this.makeRandomMatrix(), this.color); // Color should be dynamic
		}

		if(this.type == 'mutate') {
			let flipBit = (i => i == 0 ? 1 : 0); 
			let i = mu.randomInt(0,this.gridsize); 
			let j = mu.randomInt(0,this.gridsize); 

			// Special case: don't flip off monomino do doo do do do 
			let cellCount = matrix.reduce((acc,row) => acc + row.reduce((acc2, cell) => cell ? acc2 + 1 : acc2, 0), 0); 
			while(cellCount < 2 && matrix[i][j]) {
				i = mu.randomInt(0,this.gridsize); 
				j = mu.randomInt(0,this.gridsize); 
			}
			
			this.matrix[i][j] = flipBit(this.matrix[i][j]);

			return new FallingTetomino(this.matrix, this.color); // Color should be dynamic
		}
	}

	makeRandomMatrix() {

		// Initialize empty grid
		let matrix = []; 
		for(let i = 0; i < this.gridsize; i++) {
			let row = [];
			for(let j = 0; j < this.gridsize; j++) {
				row.push(0);
			}
			matrix.push(row); 
		}

		// Every cell is equal probability
		if(this.randomStyle == 'shotgun') {
			for(let i = 0; i < this.gridsize; i++) {
				for(let j = 0; j < this.gridsize; j++) {
					matrix[i][j] = Math.random() < this.density ? 1 : 0;  
				}
			}

			return matrix; 
		}


		// Ant walks density steps orthogonally
		if(this.randomStyle == 'ortho') {
			let anti = Math.floor((this.gridsize-1)/2);
			let antj = anti; 

			let squaresToWalk = Math.floor(this.gridsize**2 * this.density);

			let inGrid = (i => i > 0 && i < this.gridsize); 
			while(squaresToWalk) {
				matrix[anti][antj] = 1;

				let dir = ['up', 'down', 'left', 'right'][mu.randomInt(0,3)];

				if(dir == 'up' && inGrid(antj - 1)) {
					antj--; 
				} elsif(dir == 'down' && inGrid(antj + 1)) {
					antj++;
				} elsif(dir == 'left' && inGrid(anti - 1)) {
					anti--;
				} elsif(dir == 'right' && inGrid(antj + 1)) {
					anti++; 
				} else {
					continue;
				}

				squaresToWalk--; 
			}

			return matrix; 

		}
	}
}