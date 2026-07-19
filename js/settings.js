import {default as mu} from './mathutil.js'; 

let gameDefault = {
	gr: 0, 
	boardWidth: 10, 
	boardHeight: 20, 
	mystery: 15584, 
	fallingSpeed: 35, 
	fa: 1.01, 
	nextPieces: 1, 
	closeEnough: 0, 
	heldPieces: 0, 
	garbagePercentage: 50, 
	scoreAcceleration: 1, 
	wrapAround: false, 
	rgr: false, 
	sd: false, 
	dual: false, 
	flipping: false, 
	stairs: false};

export let game = {...gameDefault};

export let user = {
	udDual: false, 
	lrDual: false, 
	rotateDual: false, 
	wadc: false, 
	prdb: 0, 
	prscb: 0, 
	prsb: 0};

export function resetSettings() { 
  game = {...gameDefault};
}

export function showSettings() {
  document.getElementById("settingGR").value = game["gr"];
  document.getElementById("settingBoardWidth").value = game["boardWidth"];
  document.getElementById("settingBoardHeight").value = game["boardHeight"];
  document.getElementById("settingMystery").value = game["mystery"];
  document.getElementById("settingFallingSpeed").value = game["fallingSpeed"];
  document.getElementById("settingFA").value = game["fa"];
  document.getElementById("settingNextPieces").value = game["nextPieces"];
  document.getElementById("settingCloseEnough").value = game["closeEnough"];
  document.getElementById("settingHeldPieces").value = game["heldPieces"];
  document.getElementById("settingGarbagePercentage").value = game["garbagePercentage"];
  document.getElementById("settingScoreAcceleration").value = game["scoreAcceleration"];
  document.getElementById("settingWrapAround").checked = game["wrapAround"];
  document.getElementById("settingRGR").checked = game["rgr"];
  document.getElementById("settingSD").checked = game["sd"];
  document.getElementById("settingDual").checked = game["dual"];
  document.getElementById("settingFlipping").checked = game["flipping"];
  document.getElementById("settingStairs").checked = game["stairs"];

  document.getElementById("settingbLRDual").checked     = user["lrDual"];
  document.getElementById("settingbUDDual").checked     = user["udDual"];
  document.getElementById("settingbRotateDual").checked = user["rotateDual"];
  document.getElementById("settingbWADC").checked       = user["wadc"];
  document.getElementById("settingbPRDB").value         = user["prdb"];
  document.getElementById("settingbPRSB").value         = user["prsb"];
  document.getElementById("settingbPRSCB").value        = user["prscb"];

  document.getElementById("settingsDialog").showModal();
  document.getElementById("settingsButton").blur();
}

export function hideSettings() {
  document.getElementById("settingsDialog").close();
}

export function saveSettings() {
  game["gr"]           = document.getElementById("settingGR").value * 1;
  game["boardWidth"]   = document.getElementById("settingBoardWidth").value * 1;
  game["boardHeight"]  = document.getElementById("settingBoardHeight").value * 1;
  game["mystery"]      = document.getElementById("settingMystery").value * 1;
  game["fallingSpeed"] = document.getElementById("settingFallingSpeed").value * 1;
  game["fa"]           = document.getElementById("settingFA").value * 1;
  game["nextPieces"]   = document.getElementById("settingNextPieces").value * 1;
  game["closeEnough"]  = document.getElementById("settingCloseEnough").value * 1;
  game["heldPieces"]   = document.getElementById("settingHeldPieces").value * 1;
  game["garbagePercentage"] = document.getElementById("settingGarbagePercentage").value * 1;
  game["scoreAcceleration"] = document.getElementById("settingScoreAcceleration").value * 1;
  game["wrapAround"]   = document.getElementById("settingWrapAround").checked;
  game["rgr"]          = document.getElementById("settingRGR").checked;
  game["sd"]           = document.getElementById("settingSD").checked;
  game["dual"]         = document.getElementById("settingDual").checked;
  game["flipping"]     = document.getElementById("settingFlipping").checked;
  game["stairs"]       = document.getElementById("settingStairs").checked;

  user["lrDual"]     = document.getElementById("settingbLRDual").checked;
  user["udDual"]     = document.getElementById("settingbUDDual").checked;
  user["rotateDual"] = document.getElementById("settingbRotateDual").checked;
  user["wadc"]       = document.getElementById("settingbWADC").checked;
  user["prdb"]       = document.getElementById("settingbPRDB").value * 1;
  user["prscb"]      = document.getElementById("settingbPRSCB").value * 1;
  user["prsb"]       = document.getElementById("settingbPRSB").value * 1;

  
  document.getElementById("settingsDialog").close();
}


// Temp dup FIXME ==============
function padwithzeros(string) {
  let a = string;
  for (let i=0; i < 6 - string.length; i++) {
    a = '0' + a;
  }
  return a;
}
function allorientations(matrix) {
  return [matrix,rotate(matrix),rotate(rotate(matrix)),rotate(rotate(rotate(matrix))), matrix.toReversed(), rotate(matrix.toReversed()), rotate(rotate(matrix.toReversed())), rotate(rotate(rotate(matrix.toReversed())))];
}
function rotate(matrix) {
  const N = matrix.length - 1;
  const result = matrix.map((row, i) =>
    row.map((val, j) => matrix[N - j][i])
  );

  return result;
}
function colorDistance(a, b) {
  return Math.sqrt(
    (parseInt(a[1] + a[2], 16) - parseInt(b[1] + b[2], 16))**2 * 2.5 + 
    (parseInt(a[3] + a[4], 16) - parseInt(b[3] + b[4], 16))**2 * 5 + 
    (parseInt(a[5] + a[6], 16) - parseInt(b[5] + b[6], 16))**2 * 1.5);
}
function matrix2color(matrix) {
  let matrices = [matrix, rotate(matrix), rotate(rotate(matrix)), rotate(rotate(rotate(matrix)))];
  let bottoms = matrices.map(matrice => removeEdgeInf(matrice.map(row => mu.minusonetoinf(row.indexOf(1)))));
  let A = mu.extremifiedaverage(bottoms.map(bottom => mu.zeroifnan(bottom2numberA(bottom))));
  let B = mu.extremifiedaverage(bottoms.map(bottom => mu.zeroifnan(bottom2numberB(bottom))));
  let C = mu.extremifiedaverage(bottoms.map(bottom => mu.zeroifnan(bottom2numberC(bottom))));
  return '#' + padwithzeros((Math.round(A) * 65536 + Math.round(B) * 256 + Math.round(C)).toString(16));
}
function removeEdgeInf(array) {
  let boole = false;
  let half = [];
  for (let i=0; i < array.length; i++) {
    if (array[i] != Infinity) {
      boole = true;
    }
    if (boole) {half.push(array[i]);}
  }
  boole = false;
  let toret = [];
  for (let i=array.length - 1; i > -1; i--) {
    if (array[i] != Infinity) {
      boole = true;
    }
    if (boole) {toret.unshift(array[i]);}
  }
  return toret;
}
function bottom2numberA(bottom) {
  let toret = 0;
  for (let i=0; i<bottom.length; i++) {
    toret += (1 - 0.5 ** bottom[i]);
  }
  return Math.cbrt(toret / bottom.length) * 255;
} 

function bottom2numberB(bottom) {
  let toret = 0;
  for (let i=0; i<bottom.length; i++) {
    if ((i + bottom[i]) % 2 > 0) {
      toret += 255;
    } else {
      if ((i + bottom[i] + 1) % 2 > 0) {
        toret -= 255;
      }
    }
  }
  return (toret / bottom.length + 255) / 2;
}

function bottom2numberC(bottom) {
  let toret = 0;
  for (let i=0; i<bottom.length; i++) {
    toret += bottom[i] * i / bottom.length;
  }
  return (0.5 ** toret) * 255;
}
// ==================

export function randomizeSettings(allpieces) {
  game["boardHeight"] = mu.getRandomInt(10,30);
  game["boardWidth"] = mu.getRandomInt(Math.round(game["boardHeight"]/3), Math.round(game["boardHeight"]*2/3));
  game["gr"] = Math.min(mu.getRandomInt(0,game["boardHeight"]),mu.getRandomInt(0,game["boardHeight"]));
  game["fallingSpeed"] = mu.getRandomInt(20, 50);
  game["fa"] = 1 + 0.02 * Math.random();
  game["mystery"] = 0;
  let randomColor = '#' + padwithzeros(mu.getRandomInt(0, 16777215).toString(16));
  let j = Math.ceil(Math.random()**Math.exp(- user.prdb / 3) * allpieces.length); // ISSUE
  for (let i = 1 + Math.floor(-6*Math.log(Math.random()));i>0;i--) {
    let k = mu.getRandomInt(0,j);
    while (((allorientations(allpieces[k]).lastIndexOf(allpieces[k]) > 3 ^ (Math.random() < 1 / (Math.exp(-user.prsb) + 1))) ||
      (colorDistance(matrix2color(allpieces[k]), randomColor) > 255 * 3 / Math.exp(user.prscb)) && Math.random() > 0.0003) || !(game["mystery"] % 2**(k+1) < 2**k) ) {

      k = (Math.random() > 0.003) ? mu.getRandomInt(0,j) : mu.getRandomInt(0, allpieces.length - 1);
    }
    game["mystery"] += 2**k;
  }
  game["nextPieces"] = Math.floor(-2*Math.log(Math.random()));
  game["closeEnough"] = Math.floor(-Math.log(Math.random()));
  game["heldPieces"] = Math.floor(-2*Math.log(Math.random()));
  game["garbagePercentage"] = mu.getRandomInt(1, 99);
  game["scoreAcceleration"] = mu.getRandomInt(0, 2);
  game["wrapAround"] = (Math.random() > 5/6);
  game["rgr"] = (Math.random() > 5/6);
  game["sd"] = (Math.random() > 5/6);
  game["dual"] = (Math.random() > 5/6);
  game["flipping"] = (Math.random() > 5/6);
  game["stairs"] = (Math.random() > 5/6);

}