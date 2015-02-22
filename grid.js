CELLSIZE = 20;//px
SCREEN_ADJ = 0.91;

var Grid = renderGrid(CELLSIZE, SCREEN_ADJ);
var R = Object.keys(Grid).length;
var C = Object.keys(Grid[0]).length;

var midR = Math.floor(R/2);
var midC = Math.floor(C/2);
var START = Grid[midR][midC];

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
