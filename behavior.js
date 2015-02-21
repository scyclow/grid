COLORS = [
  '#0543AC', //BASE
  '#FF7000', 
  '#88FF00',
  '#FF66D7',
  '#2BF2FF',
  '#FFFFFF'
];
BASE_COLOR = COLORS[0];

CELL_SIZE_ADJ = 1;
CELL_RAD_ADJ = 1;

activeColor = null;
function colorSample(base) {
  if (base) {
    return COLORS[0];
  }
  var colors = COLORS.slice(1);
  var ix = Math.floor( Math.random()*colors.length );

  newColor = colors[ix];
  if (newColor === activeColor) {
    return colorSample(base);
  } else {
    activeColor = newColor;
    return activeColor;
  }
}

var growths = [new Growth(START, colorSample(false))];

var t = (new Date()).getTime(); // TODO remove

function warp() {
  var randSize = Math.random()*CELLSIZE*CELL_SIZE_ADJ;

  forEachCellIn( Grid, {
    'height': randSize, 
    'width': randSize,
    'border-radius': Math.random()*CELLSIZE*CELL_RAD_ADJ,
    'margin-top': (CELLSIZE-randSize)/2,
    'margin-bottom': (CELLSIZE-randSize)/2,
    'margin-left': (CELLSIZE-randSize)/2,
    'margin-right': (CELLSIZE-randSize)/2,
  });
}

function renderGrowths() {
  for (var g=0; g < growths.length; g++) {
    var growth = growths[g];
    growth.render();
    if (growth.dead) {
      growths.splice(g,1); g--; // remove from array, adjust ix
    }
  }
}

function run() {
  renderGrowths();
  warp();
  console.log((new Date()).getTime() - t);  // TODO remove
}

document.addEventListener("DOMContentLoaded", function(event) {
  setInterval(run, TIME);
});
///////////////
// warp()/////
/////////////

function newGrowth(colorIx) {
  color = COLORS[colorIx] || colorSample();
  growths.push(new Growth(START, color));
}

function erase() {
  growths = [
    new Growth(Grid[0][0], colorSample(true)),
    new Growth(Grid[0][C-1], colorSample(true)),
    new Growth(Grid[R-1][0], colorSample(true)),
    new Growth(Grid[R-1][C-1], colorSample(true))
  ];
}

function changeCellSize(amount) {
  CELL_SIZE_ADJ += amount;
}

function changeCellRadius(amount) {
  CELL_RAD_ADJ += amount;
}

window.onkeydown = function(e){
  if (e.keyCode === 32) { erase(); } // spacebar
  if (e.keyCode === 67) { newGrowth(1); } // c
  if (e.keyCode === 86) { newGrowth(2); } // v
  if (e.keyCode === 66) { newGrowth(3); } // b
  if (e.keyCode === 78) { newGrowth(4); } // n
  if (e.keyCode === 77) { newGrowth(5); } // m

  if (e.keyCode === 38) { changeCellSize(0.1); } // up
  if (e.keyCode === 40) { changeCellSize(-0.1); } // down
  if (e.keyCode === 37) { changeCellRadius(-0.1); } // left
  if (e.keyCode === 39) { changeCellRadius(0.1); } // right
}
