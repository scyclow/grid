TIME = 10;
CELLSIZE = 20;//px
ADJ = 0.91;

var Grid = renderGrid(CELLSIZE, ADJ);
var R = Math.floor(Object.keys(Grid).length/2);
var C = Math.floor(Object.keys(Grid[0]).length/2);
var START = Grid[R][C];

function dCell(cell, color) {
  document.getElementById(cell).style['background-color']=color;
}

function Growth(start, color) {
  var newCells = [start];
  var oldCells = [];
  var recentCells;

  this.dead = false;

  this.dGrid = function() {
    recentCells = oldCells;
    oldCells = newCells;
    newCells = [];

    if(oldCells[0]) {dCell(oldCells[0], color)}

    this.dead = true; // growth is dead, unless told otherwise

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
        var neighbor = neighbors[n];  
        if (neighbor && 
          newCells.indexOf(neighbor) < 0 && 
          recentCells.indexOf(neighbor) < 0
        ) {
          this.dead = false;
          dCell(neighbor, color);
          newCells.push(neighbor);
        }
      }
    }
  }
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

  griDOM.style.width = maxW/adj;
  griDOM.style.height = maxH*adj;

  return gridJS;
}


