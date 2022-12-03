const fs = require('fs');

/** 
 * A for Rock, 
 * B for Paper, and 
 * C for Scissors 
 * 
 * X for Rock, 
 * Y for Paper, and 
 * Z for Scissors
 * 
 * */

const ROCK = 1;
const PAPER = 2;
const SCISSORS = 3;

fs.readFile('./input.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  data = data.replaceAll('\r', '').trim();
  data = data.replaceAll('A', ROCK).replaceAll('X', ROCK);
  data = data.replaceAll('B', PAPER).replaceAll('Y', PAPER);
  data = data.replaceAll('C', SCISSORS).replaceAll('Z', SCISSORS);
  // console.log(data)
  var plays = data.split('\n');
  // console.log(plays)

  var scores = plays.map(a => {
    const [enemy, mine] = a.split(' ').map(x => parseInt(x));
    const isWin = mine === ROCK && enemy === SCISSORS || mine === PAPER && enemy === ROCK || mine === SCISSORS && enemy === PAPER
    console.log(enemy, mine, isWin)
    if (!mine) return 0;
    // console.log(mine)
    if (mine === enemy) {
      return mine + 3;
    } else if (isWin) {
      return mine + 6;
    } else {
      return mine;
    }
  })


  var sum = scores.reduce((a, b) => a + b)

  console.log(sum)

});
