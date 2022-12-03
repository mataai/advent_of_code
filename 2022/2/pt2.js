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

const DRAW = 'Y';
const WIN = 'Z';
const LOSE = 'X';

fs.readFile('./input.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  data = data.replaceAll('\r', '').trim();
  data = data.replaceAll('A', ROCK);
  data = data.replaceAll('B', PAPER);
  data = data.replaceAll('C', SCISSORS);
  var plays = data.split('\n');

  var scores = plays.map(a => {
    let [enemy, action] = a.split(' ');
    enemy = parseInt(enemy)
    switch (action) {
      case WIN: {
        switch (enemy) {
          case ROCK:
            return getScore(PAPER, enemy);
          case PAPER:
            return getScore(SCISSORS, enemy);
          case SCISSORS:
            return getScore(ROCK, enemy);
        }
      }
      case DRAW: {
        return getScore(enemy, enemy);
      }
      case LOSE: {
        switch (enemy) {
          case ROCK:
            return getScore(SCISSORS, enemy);
          case PAPER:
            return getScore(ROCK, enemy);
          case SCISSORS:
            return getScore(PAPER, enemy);
        }
      }
    }
  })

  var sum = scores.reduce((a, b) => a + b)

  console.log(sum)

});


function getScore(mine, enemy) {
  if (!mine || !enemy) return 0;
  const isWin = mine === ROCK && enemy === SCISSORS || mine === PAPER && enemy === ROCK || mine === SCISSORS && enemy === PAPER
  if (mine === enemy) {
    return mine + 3;
  } else if (isWin) {
    return mine + 6;
  } else {
    return mine;
  }
}