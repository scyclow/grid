ORIGINAL_COLORS = [
  '#0543AC',
  '#FF7000',
  '#88FF00',
  '#FF66D7',
  '#2BF2FF',
  '#FFFFFF'
];

function ColorPalette() {
  this.active = ORIGINAL_COLORS;
  this.base = this.active[0];

  this.changeBase = function(n) {
    this.active = ORIGINAL_COLORS;
    for (var i=0; i<n; i++) {
      this.active.push( this.active.shift() );
    }
    this.base = this.active[0]
    document.getElementsByTagName('body')[0].style['background-color'] = this.base;
  };

  var last= null;
  this.sample = function(base) {
    if (base) {
      return this.base;
    }
    var newColors = this.active.slice(1);
    var ix = Math.floor( Math.random()*newColors.length )
    var newColor = newColors[ix];

    if (newColor === last) {
      return this.sample(base);
    } else {
      last = newColor;
      return last;
    }
  }
}
