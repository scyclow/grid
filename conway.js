TIME = 10;
CELLSIZE = 20;//px
ADJ = 0.91;

var Grid = renderGrid(CELLSIZE, ADJ);
var R = Math.floor(Object.keys(Grid).length/2);
var C = Math.floor(Object.keys(Grid[0]).length/2);
var START = Grid[R][C];

var newCells = [START];
var oldCells = [];

function dGrid(color) {
  var recentCells = oldCells;
  oldCells = newCells;
  newCells = [];

  dCell(oldCells[0], color)
  for (var i=0; i<oldCells.length; i++) {
    var cell = oldCells[i];

    var coords = cell.split('-')
    var row = Number( coords[0] );
    var col = Number( coords[1] );

    var neighbors = [
      Grid[row][col+1],
      Grid[row][col-1],
      Grid[row+1] ? Grid[row+1][col] : null,
      Grid[row-1] ? Grid[row-1][col] : null
    ];

    for (var n in neighbors) {     
      if (neighbors[n] && 
        newCells.indexOf(neighbors[n]) < 0 && 
        recentCells.indexOf(neighbors[n]) < 0
      ) {
        dCell(neighbors[n], color);
        newCells.push(neighbors[n]);
      }
    }
  }
}

function dCell(cell, color) {
  document.getElementById(cell).style['background-color']=color;
}

function warp() {
  $('.cell').css({
    'border-radius': Math.random()*CELLSIZE
  });

  var randSize = Math.random()*CELLSIZE;

  $('.cell').css({
    'height': randSize, 
    'width': randSize,
    'margin-top': (CELLSIZE-randSize)/2,
    'margin-bottom': (CELLSIZE-randSize)/2,
    'margin-left': (CELLSIZE-randSize)/2,
    'margin-right': (CELLSIZE-randSize)/2,
  });
}

var count = 0;
var color = 'orange';

function run() {
  count += 1;

  dGrid(color);
  warp()
}

function renderGrid(cellSize, adj) {
  var maxW = window.outerWidth*adj;
  var maxH = window.innerHeight;

  var rowN = Math.floor(maxH/cellSize);
  var colN = Math.floor(maxW/cellSize);

  var griDOM = document.getElementById('grid');
  var gridJS = {};

  for (var r=0; r<rowN; r++) {
    var tr = document.createElement('div');
    tr.setAttribute('class', 'row')
    gridJS[r] = {};

    for (var c=0; c<colN; c++) {
      var td = document.createElement('div');
      var id = [r,c].join('-');
      td.setAttribute('id', id);
      td.setAttribute('class', 'cell');
      tr.appendChild(td);
      gridJS[r][c] = id;
    }

    griDOM.appendChild(tr);
  }

// TODO remove jQuery
  ;
  $('#grid').css({
    'width': maxW/adj,
    'height': maxH*adj,
  })
  ;
  $('.cell').css({
    'width': cellSize/2,
    'height': cellSize/2,
    'border-radius': cellSize/2
  })

  return gridJS;
}


