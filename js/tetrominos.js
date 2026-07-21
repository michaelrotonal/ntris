////// For hard-coded tetrominoes

import {default as mu} from './mathutil.js'; 

export const tetrominos = {
  'I': [
    [0,0,0,0],
    [1,1,1,1],
    [0,0,0,0],
    [0,0,0,0]
  ],
  'J': [
    [1,0,0],
    [1,1,1],
    [0,0,0],
  ],
  'L': [
    [0,0,1],
    [1,1,1],
    [0,0,0],
  ],
  'O': [
    [1,1],
    [1,1],
  ],
  'S': [
    [0,1,1],
    [1,1,0],
    [0,0,0],
  ],
  'Z': [
    [1,1,0],
    [0,1,1],
    [0,0,0],
  ],
  'T': [
    [0,1,0],
    [1,1,1],
    [0,0,0],
  ],
  'FY': [
    [1,1,1],
    [1,0,1],
    [1,1,0]
  ],
  '|': [
    [0,0,0],
    [1,1,1],
    [0,0,0]
  ],
  'II': [
    [0,0,0,0,0],
    [0,0,0,0,0],
    [1,1,1,1,1],
    [0,0,0,0,0],
    [0,0,0,0,0]
  ],
  'F': [
    [1,1,0],
    [0,1,1],
    [0,1,0]
  ],
  'D': [
    [0,0,1],
    [0,1,0],
    [1,0,0]
  ],
  'W': [
    [0,0,1,1],
    [0,1,1,0],
    [1,1,0,0],
    [1,0,0,0]
  ],
  'l': [
    [1,1],
    [1,0]
  ],
  'X': [
    [0,0,0,0,0],
    [0,0,1,0,0],
    [0,1,1,1,1],
    [0,0,1,0,0],
    [0,0,0,0,0]
  ],
  'R': [
    [0,1,1],
    [1,1,0],
    [0,1,0]
  ],
  'theBrick': [
    [1,1,1],
    [1,1,1],
    [0,0,0]
  ],
  '.': [
    [1]
  ],
  "i": [
    [1,1],
    [0,0]
  ],
  'X2': [
    [0,1,0,0],
    [1,1,1,1],
    [0,1,0,0],
    [0,1,0,0]
  ],
  'brick2': [
    [1,1,1],
    [1,1,1],
    [1,1,1]
  ],
  'FYold': [
    [1,1,1],
    [1,0,1],
    [1,1,1]
  ],
  'V': [
    [0,0,1],
    [0,0,1],
    [1,1,0]
  ],
  'random': [
    [mu.getRandomInt(0,1),mu.getRandomInt(0,1),mu.getRandomInt(0,1)],
    [mu.getRandomInt(0,1),mu.getRandomInt(0,1),mu.getRandomInt(0,1)],
    [mu.getRandomInt(0,1),mu.getRandomInt(0,1),mu.getRandomInt(0,1)]
  ],
  'random2': [
    [0, mu.getRandomInt(0,1), mu.getRandomInt(0,1), 0],
    [mu.getRandomInt(0,1), mu.getRandomInt(0,1), mu.getRandomInt(0,1), mu.getRandomInt(0,1)],
    [mu.getRandomInt(0,1), mu.getRandomInt(0,1), mu.getRandomInt(0,1), mu.getRandomInt(0,1)],
    [0, mu.getRandomInt(0,1), mu.getRandomInt(0,1),0]
  ],
  'd': [
    [0,1],
    [1,0]
  ],
  'banana': [
    [0,0,1],
    [1,1,0],
    [0,0,0]
  ],
  'unbanana': [
    [1,0,0],
    [0,1,1],
    [0,0,0]
  ],
  '[': [
    [0,0,0,0,0],
    [1,0,0,0,1],
    [1,1,1,1,1],
    [0,0,0,0,0],
    [0,0,0,0,0]
  ],
  'R2': [
    [0,1,1,1],
    [1,1,0,0],
    [0,1,0,0],
    [0,1,0,0]
  ],
  'F2': [
    [1,1,1,0],
    [0,0,1,1],
    [0,0,1,0],
    [0,0,1,0]
  ]
};
tetrominos['random'] = mu.toCentered(tetrominos['random']);
tetrominos['random2'] = mu.toCentered(tetrominos['random2']);
tetrominos['madnor'] = tetrominos['random'].map(cell => cell.toReversed()); // there's like no way this worked first try
tetrominos['madnor2'] = tetrominos['random2'].map(cell => cell.toReversed());


// color of each tetromino
export const colors = {
  'I': '#00FFFF',
  'O': '#FFFF00',
  'T': '#800080',
  'S': '#008000',
  'Z': '#FF0000',
  'J': '#0000FF',
  'L': '#FFA400',
  'FY': '#FFFFFF',
  '|': '#00FFFF',
  'II': '#00FFFF',
  'F': '#8B0000',
  'D': '#808080',
  'W': '#C0C0C0',
  'l': '#FFC0CB',
  'garbage': '#DCDCDC',
  'X': '#8B4513',
  'nonsolid': '#1F1F1F',
  'R': '#006400',
  'theBrick': '#A52A2A',
  '.': '#663399',
  'i': '#4169E1',
  'X2': '#B22222',
  'brick2': '#B22222',
  'FYold': '#FFFFFF',
  'V': '#87CEEB',
  'random': '#' + mu.getRandomInt(100000,999999),
  'madnor': '#' + mu.getRandomInt(100000,999999),
  'random2': '#' + mu.getRandomInt(100000,999999),
  'madnor2': '#' + mu.getRandomInt(100000,999999),
  'd': '#FF1493',
  'banana': '#F5F5DC',
  'unbanana': '#FFFFE0',
  '[': '#C701FF',
  'F2': '#440000',
  'R2': '#003500'
};

// defunct
export var allpieces = ['.', 'i', 'l', 'd', '|', 'I', 'T', 'O', 'banana', 'unbanana', 'L', 'J', 'S', 'Z', 'V', 'F', 'R', 
'II', 'X', 'random', 'madnor', 'FY', 'theBrick', 'brick2', 'random2', 'madnor2', 'D', 'F2', 'R2', 'X2', 
'FYold', '[', 'W']; //.map(x => ts.tetrominos[x]); // i could do the effort of properly removing this, but i'm pretty sure we'll usurp the need for this list soon
