COLORS = [
  '#0543AC', //BASE
  '#FF7000', 
  '#88FF00',
  '#2BF2FF',
  '#FF66D7',
  '#FFFFFF'
];
BASE_COLOR = COLORS[0];

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

// TODO get rid of jQuery
function warp() {
  var randSize = Math.random()*CELLSIZE;

  $('.cell').css({
    'height': randSize, 
    'width': randSize,
    'border-radius': Math.random()*CELLSIZE,
    'margin-top': (CELLSIZE-randSize)/2,
    'margin-bottom': (CELLSIZE-randSize)/2,
    'margin-left': (CELLSIZE-randSize)/2,
    'margin-right': (CELLSIZE-randSize)/2,
  });
}

function run() {
  for (var g=0; g < growths.length; g++) {
    var growth = growths[g];
    growth.dGrid();
    if (growth.dead) {
      growths.splice(g,1); g--; // remove from array, adjust ix
    }
  }

  warp();
  console.log((new Date()).getTime() - t);  // TODO remove
}

document.addEventListener("DOMContentLoaded", function(event) {
  setInterval(run, TIME);
});
///////////////
// warp()/////
/////////////

window.onkeydown = function(){
  growths.push(new Growth(START, colorSample()));
}
