import * as settings from './settings.js'; 
import * as ts from './tetrominos.js'; 
import TetrominoBlueprint from './TetrominoBlueprint.js'; 
import {default as mu} from './mathutil.js'; 
import Tetromino from './Tetromino.js';

import ExampleTetrominoFactory from "./ExampleTetrominoFactory.js";

export class TetrominoFactory {
	constructor(nextPieces, blueprints, tfsettings) {
		this.nextPieces = nextPieces; 
		this.blueprints = blueprints;
		this.tfsettings = tfsettings; 
		this.distribution = tfsettings.distribution; 
		this.tetrominoSequence = []; 
	}

	getRandomBag() {
	  let blueprints = this.blueprints.slice();  
	  let bag = [];

	  while (blueprints.length) {
	    let rand = mu.getRandomInt(0, blueprints.length - 1);
	    bag.push(blueprints.splice(rand, 1)[0]);
	  }		

	  return bag; 
	}
	
	getNextTetromino() {
		if(this.tetrominoSequence.length > this.nextPieces) {
			return this.tetrominoSequence.splice(0,1)[0]; 
		}

		if(this.distribution == 'bag') {
			let pieces = this.getRandomBag(); 
			pieces.forEach(blueprint => {
				this.tetrominoSequence.push(blueprint.makeTetromino()); 
			});

			return this.tetrominoSequence.splice(0,1)[0]; 
		}

		if(this.distribution == 'random') {
			let pieces = this.getRandomBag();
			return pieces[mu.getRandomInt(0, pieces.length - 1)];
		}


	}

	getLookahead() {
		return this.tetrominoSequence;
	}


}

// FactoryFactories are in fact a real thing 
export function tetrominoFactoryFactory() {
	// An example minimal tetrominal factory
	// Uncomment the below line to use it
	//
	// In practice, this function should be expanded into something
	// that intelligently translates settings into tetromino factories,
	// including combining settings when needed. 
	// 
	//return new ExampleTetrominoFactory(settings.game.nextPieces);

	if(settings.game.morph) {
		return makeMorph();
	}
	if(settings.game.drunkAnt) {
		return makeDrunkAnt(); 
	}
	//return makeStandardTetris(); 
	return makeFromMystery();
}

// Example
function makeStandardTetris() {
    let blueprints = [];
    ['I', 'O', 'T', 'S', 'Z', 'J', 'L'].forEach(i => {
		let bp = new TetrominoBlueprint({type: 'static', matrix: ts.tetrominos[i], color: ts.colors[i], name: i, colorMode: 'static'});
		blueprints.push(bp); 
	});

	return new TetrominoFactory(settings.game.nextPieces, blueprints, {distribution: 'bag'}); 
}

// Current behavior (or close) 
function makeFromMystery() {  
  let blueprints = [];

  for(let i = 0; i < ts.allpieces.length; i++) {
    if (!(settings.game.mystery % 2**(i + 1) < 2**i)) {
      let name = ts.allpieces[i]; 
      let bp;

      // Similar to existing game: random pieces are set at game start (though not page load)
      if(name == 'random' || name == 'random2') {
      	bp = new TetrominoBlueprint({type: 'random', 
      		stability: 'stable',
      		randomStyle: 'shotgun',
      		gridsizeRows: ts.tetrominos[name].length,
      		gridsizeCols: ts.tetrominos[name][0].length, 
      		color: null, 
      		colorStyle: 'dynamic',
      		name: name});	
      } else {
      	bp = new TetrominoBlueprint({type: 'static', matrix: ts.tetrominos[name], color: ts.colors[name], name: name, colorStyle: settings.user.useStaticColor ? 'static' : 'dynamic'});
      }
	  blueprints.push(bp); 
    }
  }
  
  return new TetrominoFactory(settings.game.nextPieces, blueprints, {distribution: 'bag'}); 
}

function makeMorph() {
    let blueprints = [];
    ['I', 'O', 'T', 'S', 'Z', 'J', 'L'].forEach(i => {
		let bp = new TetrominoBlueprint({
			type: 'mutate', 
			chanceToMutate: 0.2,
			matrix: ts.tetrominos[i], 
			color: ts.colors[i],
			colorStyle: settings.user.useStaticColor ? 'static' : 'dynamic'});
		blueprints.push(bp); 
	});

	return new TetrominoFactory(settings.game.nextPieces, blueprints, {distribution: 'bag'}); 	
}

function makeDrunkAnt() {
    let blueprints = [];

	let pieceCount = Math.ceil(-7*Math.log(Math.random()));
	for(let i = 0; i < pieceCount; i++) {
		let rows = 1 + Math.ceil(-3*Math.log(Math.random()));
		let cols = rows; //mu.getRandomInt(1,5); // For some reason, rectanges mess up rotate.
		let bp = new TetrominoBlueprint({
			type: 'random',
			stability: 'unstable',
			gridsizeCols: cols,
			gridsizeRows: rows,
			density: 0.3,
			randomStyle: 'ortho',
			colorStyle: 'driftOnPaint',
			colorDriftAmount: 2
		});
		blueprints.push(bp); 
	}

	return new TetrominoFactory(settings.game.nextPieces, blueprints, {distribution: 'bag'}); 
}