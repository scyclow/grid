// Grid >> grid.js

function Growth(start, color) {
  var newCells = [start];
  var oldCells = [];
  var recentCells;

  this.dead = false;

  this.render = function() {
    recentCells = oldCells;
    oldCells = newCells;
    newCells = [];

    if(oldCells[0]) {
      dCell(oldCells[0], 'background-color', color)
    }

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
          dCell(neighbor, 'background-color', color);
          newCells.push(neighbor);
        }
      }
    }
  }
}

function dCell(cell, cssStyle, property) {
  document.getElementById(cell).style[cssStyle]=property;
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

function newGrowth(colorIx) {
  var newColor = colors.active[colorIx] || colors.sample();
  growths.push(new Growth(START, newColor));
}

function erase() {
  growths = [
    new Growth(Grid[0][0], colors.sample(true)),
    new Growth(Grid[0][C-1], colors.sample(true)),
    new Growth(Grid[R-1][0], colors.sample(true)),
    new Growth(Grid[R-1][C-1], colors.sample(true))
  ];
}

// a SHIT LOAD faster than using jQuery's $('.cell').css({...})
function forEachCellIn(grid, styles) {
  for (var r in grid) {
    var row = grid[r];
    for (var c in row) {
      var cellId = row[c];

      for (var property in styles) {
        dCell(cellId, property, styles[property]);
      }
    }
  }
}