//DOM event listener
// $(function() {
//   console.log('DOM loaded and ready!');
//   // populateArray(gameArray);
//   createArray(3,3);
// })

//size of the board, will be taken from get form
var boardSize = 3;

var difficulty = .3;

//creating the vertical array to nest horizontal arrays
var row1 = [-1, 0, 0, 0];
var row2 = [0, -1, 0, 0];
var row3 = [-1, 0, 0, 0];
var row4 = [0, 0, 0, -1];
var gameArray = new Array(row1,row2,row3,row4);


// default function that populates a 3x3 array
//with values from 1 to 9
// function populateArray(arrr) {
//   let counter = 1;
//   for (let i = 0; i < 2; i++) {
//     for (let j = 0; j < 2; j++){
//       arrr[i][j] = counter;
//       counter++;
//       console.log(`row ${i}, column ${j} = ${arrr[i][j]}`);
//     }
//   }
// }

//FUNCTION: creates an empty array by taking
//ARGUMENTS: horizontal size and vertical size
uses random to randomize the values of the array
function createArray(x, y) {
  let gameArray3 = [];
  //creating a for loop to give columns
  for (let i = 0; i < x; i++) {
    //using push method to add array to the array
    gameArray3.push([]);
    for (let j = 0; j < y; j++) {
      //random function to validate against the difficulty
      if (Math.floor(Math.random()) <= difficulty) {
        gameArray3[i].push('-1');
      }
      //unsing push method to populate values
      gameArray3[i].push('0');
    }
  }
  console.log(gameArray3);
}
createArray();

//FUNCTION: one by one console where the mines are.
//ARGUMENTS: the array to be checked
function flagger(arrr) {
  //double for loop for iteration in matrix
  for (let i = 0; i < arrr.length; i++) {
    for (let j = 0; j < arrr[i].length; j++) {
        //if there's a -1 display that you have hit a mine
        if (arrr[i][j] == -1) {
          console.log(`hit a mine at ${i},${j}`);
          addOneAllAround(arrr);
        } else console.log(`NO MINE at ${i},${j}`);
    }
  }
}
flagger(gameArray);

//function created to count how many mines are around the boxes around
//ARGUMENTS: the array to check, values or i and j from a for loop
function addOneAllAround(arrr) {
  for (let i = 0 ; i < arrr.length; i++) {
    for (let j = 0; j < arrr[i].length; j++) {
      //temporary counter to accumulate mines around
      let counter = 0;
      //IF that only checks when left border is not 0
      if (j > 0) {
        if (arrr[i][j-1] == -1) {
          counter++;
        }
      }
      //IF that only checks right when i != boardSize -1
      if (j < arrr[i].length-1) {
        if (arrr[i][j+1] == -1) {
          counter++;
        }
      }
      //IF that only checks top if not in arrr[0]
      if (i > 0) {
        if (arrr[i-1][j] == -1) {
          counter++;
        }
      }
      //IF that only checks bottom if not at the bottom border
      if (i < arrr.length-1) {
        if (arrr[i+1][j] == -1) {
          counter++;
        }
      }
      //IF that only checks when not at topleft corner
      if (i > 0 && j > 0 ) {
        if (arrr[i-1][j-1] == -1) {
          counter++;
        }
      }
      //IF that only checks when not at bottom left corner
      if (i < arrr.length-1 && j > 0) {
        if (arrr[i+1][j-1] == -1) {
          counter++;
        }
      }
      //IF that only checks when not at topright corner
      if (i > 0 && j < arrr[i].length-1) {
        if (arrr[i-1][j+1] == -1) {
          counter++;
        }
      }
      //IF that only checks when not at bottom right corner
      if (i < arrr.length-1 && j < arrr[i].length-1) {
        if (arrr[i+1][j+1] == -1) {
          counter++;
        }
      }
      if (arrr[i][j] !== -1) {
        arrr[i][j] = counter;
      }
    }
  }
}

console.log(gameArray);

  // //THIS PART ONLY APPLIES WHEN AT THE CENTER
  // //if left element is not -1 ADD 1 we are NOT at the left border
  // if (hor != 0 && arrr[hor-1][ver] != -1){
  //   arrr[hor-1][ver]++;
  // }
  // //if top left element is not -1 ADD 1 and we are NOT at the left or top border
  // if (hor != 0 && vert != 0 && arrr[hor-1][ver-1] != -1){
  //   arrr[hor-1][ver-1]++;
  // }
  // //if bottom left element is not -1 ADD 1 and we are not at the left or bottom border
  // if (hor != 0 && && arrr[hor-1][ver+1] != -1) {
  //   arrr[hor-1][ver-1]++;
  // }
  // //if top element is not -1 ADD 1
  // if (arrr[hor][ver+1] != -1) {
  //   arrr[hor][ver]++;
  // }
  // //if bottom element is not -1 ADD 1
  // if (arrr[hor][ver-1] != -1) {
  //   arrr[hor][ver-1]++;
  // }
  // //if right element is not -1 ADD 1
  // if (arrr[hor+1][ver] != -1) {
  //   arrr[hor+1][ver]++;
  // }
  // //if top right element is not -1 ADD 1
  // if (arrr[hor+1][ver+1] != -1) {
  //   arrr[hor+1][ver+1]++;
  // }
  // //if bottom right element is not -1 ADD 1
  // if (arrr[hor+1][ver-1] != -1) {
  //   arrr[hor+1][ver-1]++;


