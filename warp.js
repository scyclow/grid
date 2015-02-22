CELL_SIZE_ADJ = 1;
CELL_RAD_ADJ = 1;

function warpCells() {
  var randSize = Math.random()*CELLSIZE*CELL_SIZE_ADJ;

  forEachCellIn( Grid, {
    'height': randSize, 
    'width': randSize,
    'border-radius': Math.random()*CELLSIZE*CELL_RAD_ADJ,
    'margin-top': (CELLSIZE-randSize)/2,
    'margin-bottom': (CELLSIZE-randSize)/2,
    'margin-left': (CELLSIZE-randSize)/2,
    'margin-right': (CELLSIZE-randSize)/2
  });
}

function changeCellSize(amount) {
  CELL_SIZE_ADJ += amount;
}

function changeCellRadius(amount) {
  CELL_RAD_ADJ += amount;
}