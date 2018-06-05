// remember class declarations have no hoisting!!
const Cell = require('./cellLogic');

// console.log('cell ->', Cell);
// console.log(new Cell());
class Game {
  constructor(difficulty, height, width) {
    this.difficulty = difficulty ? difficulty : 'beginner';
    this.height = difficulty === 'beginner' ? 8 : height;
    this.width = difficulty === 'beginner' ? 8 : width;
    this.totalMines = 10;
    this.board = undefined;
    this.makeBoard();
  }

  // method run during contructor that will set
  // a double array into our this.board
  makeBoard() {
    console.log('making board');
    const catcher = [];
    console.log(this.height, this.width);
    for (let x = 0; x < this.height; x++) { // y cartesian
      const secondCatcher = [];
      for (let y = 0; y < this.width; y++) {  // x cartesian
        // remember that we are using cartesian notation
        // if we are on line 0 we are at the bottom
        // these values tell us if the cell has something one line bellow.
        const down = y !== 0;
        // being at the end of our y iteration will mean we are at the top
        const up = y !== (this.height - 1);
        // same goes for the end our x iteration
        const right = x !== (this.width - 1);
        const left = x !== 0;

        const mine =
        const newCell = new Cell(0, up, right, down, left, x, y);
        // console.log(newCell);
        secondCatcher.push(newCell);
      }
      catcher.push(secondCatcher);
    }
    // console.log(catcher);
    this.board = catcher;
  }

  // method called after creating the whole board on 0
  // this will iterate x amount of times (determined by state)
  // and place a mine there randomly if there is no
  placeMines() {

    return 0
  }

  // method run during creation (makeboard)
  // that will help to allocated random mines
  // depending on the total to be introduced
  initialMines() {
    // how to account for randomnness
    // how to account for when to stop adding mines
    // how to account for mine separation
    // if we have a total of 8 x 8 = 64/10mines =
  }
}

let thing = new Game('start', 8, 8);
console.log(thing);
// for(let i = 0; i < 8; i++) {
//   console.log(thing.board[0][1].up, thing.board[0][1].x, thing.board[0][1].y);
// }

// a map on board directly is mapping the rows
// let cat = thing.board.map(row => {
//   // console.log(el);
//   return row.map(cell => {
//     return {x: cell.x, y: cell.y};
//   });
// });

// console.log(cat);
// board is nox [x][y]
console.log('up ->', thing.board[0][7].up);
console.log('right ->', thing.board[7][0].right);
console.log('down ->', thing.board[5][0].down);
console.log('left ->', thing.board[1][7].left);

// thing.board.reduce((acum, el) => {

//   return acum + el.reduce((acum, cell) => {
//     // console.log('hola');
//     return acum + cell;
//   })
// })

// a map on board[0] or subsequent
// export default Game;
