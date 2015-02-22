var auto = {
  active: true,
  TIME: 75,
  PROB: 0.5,

  toggle: function() {
    auto.active = !auto.active;
  },

  run: function() {
    if (auto.active) {
      randExec(auto.PROB, auto.brainfuck)
    }
  },

  brainfuck: function() {
    var gColor = Math.ceil( Math.random()*5 );
    var bColor = Math.floor( Math.random()*6 );

    randExec(0.75, newGrowth, gColor);
    randExec(0.75, colors.changeBase, bColor);

    randExec(0.25, erase);
  }  
}

function randExec(prob, cmd, arg) {
  if (Math.random() < prob) {
    cmd(arg);
  }
}
