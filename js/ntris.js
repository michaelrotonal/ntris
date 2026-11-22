// https://tetris.fandom.com/wiki/Tetris_Guideline

import {default as mu} from './mathutil.js'; 
import * as settings from './settings.js'; 
import * as controls from './controls.js'; 
import * as ts from './tetrominos.js'; 
import * as color from './color.js'; 
import * as gc from './GridCell.js'; 
import NtrisGame from './NtrisGame.js'; 



/*

// game + constants
// later
var tetrominoSequence = [];
var held = [];


let count = 0; // rows UntilAcc
var holdcycleattempts = 0; // later

// tf
var box = [];
var nextpieces = []; // game
var wadcmult = 1;

#ANCHOR

// game, mostly
function restartGame() {
  box = [];
  for(let i = 0; i < ts.allpieces.length; i++) {
    if (!(settings.game.mystery % 2**(i + 1) < 2**i)) {
      box.push(ts.allpieces[i]);
    }
  }
  
  holdcycleattempts = 0;


}




// tetrominofactory


// game?





*/

export var ntrisGame; 
document.addEventListener("DOMContentLoaded", function() {
  ntrisGame = new NtrisGame(); 

  document.getElementById(    "newSettingsButton").addEventListener("click", function() { settings.showNewSettings(); ntrisGame.pause(); }); 
  document.getElementById(           "helpButton").addEventListener("click", function() { controls.showControls(); ntrisGame.pause(); });
  document.getElementById("settingsShuffleButton").addEventListener("click", function() { settings.randomizeSettings(); 
                                                                                          settings.showNewSettings(); 
                                                                                        }); 
  document.getElementById(  "settingsResetButton").addEventListener("click", function() { settings.resetSettings(); 
                                                                                           settings.showNewSettings();     });
  document.getElementById(   "settingsHideButton").addEventListener("click", function() { settings.hideSettings(); ntrisGame.unPause(); }); 
  document.getElementById(   "settingsSaveButton").addEventListener("click", function() { settings.saveSettings(); 
                                                                                           ntrisGame.restartGame(); 
                                                                                           ntrisGame.unPause(); });
  document.getElementById("newSettingsSaveButton").addEventListener("click", function() { settings.saveNewSettings(); 
                                                                                           ntrisGame.restartGame(); 
                                                                                          ntrisGame.unPause(); 
                                                                                         });
  document.getElementById("newSettingsHideButton").addEventListener("click", function() {
                                                                                          settings.hideNewSettings();
                                                                                          ntrisGame.unPause(); 
                                                                                        });
  document.getElementById("PiecesTabButton").addEventListener("click", function()   { settings.showPiecesTab(); });
  document.getElementById("BoardTabButton").addEventListener("click", function()    { settings.showBoardTab(); });
  document.getElementById("GameplayTabButton").addEventListener("click", function() { settings.showGameplayTab(); });
  document.getElementById("UITabButton").addEventListener("click", function()       { settings.showUITab(); });

  document.getElementById(   "controlsHideButton").addEventListener("click", function() { controls.hideControls(); ntrisGame.unPause(); }); 


  settings.showPiecesTab();
  settings.hideNewSettings();
  ntrisGame.restartGame();
});

