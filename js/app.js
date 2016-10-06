//DOM event listener
$(function() {
  console.log('DOM loaded and ready!');
  // populateArray(gameArray);
  // createArray(3,3);
})

//size of the board, will be taken from get form
var boardSize = 9;
//variable that defines how many mines are placed inside the gameBoard
var difficulty = 30;

//creating the vertical array to nest horizontal arrays
// var row1 = [-1, 0, 0, 0];
// var row2 = [0, -1, 0, 0];
// var row3 = [-1, 0, 0, 0];
// var row4 = [0, 0, 0, -1];
// var gameArray = new Array(row1,row2,row3,row4);

//Saving the new array in a openly defined array
var gameArray = new Array;

//FUNCTION: creates an empty array by taking
//ARGUMENTS: horizontal size and vertical size
//uses random to randomize the values of the array
function createArray(arrr,x, y) {
  // let gameArray3 = [];
  //creating a for loop to give columns
  for (let i = 0; i < x; i++) {
    //using push method to add array to the array
    arrr.push([]);
    for (let j = 0; j < y; j++) {
      //random function to validate against the difficulty
      if (Math.floor(Math.random() *100) <= difficulty) {
        arrr[i].push(-1);
      } else arrr[i].push(0);
      //unsing push method to populate values
    }
  }
  console.log(arrr);
}
createArray(gameArray, boardSize, boardSize);

//FUNCTION: one by one console where the mines are.
//ARGUMENTS: the array to be checked
//uses addOneAllAround function to flag correctly
// function flagger(arrr) {
//   //double for loop for iteration in matrix
//   for (let i = 0; i < arrr.length; i++) {
//     for (let j = 0; j < arrr[i].length; j++) {
//         //if there's a -1 display that you have hit a mine
//         // if (arrr[i][j] == -1) {
//         //   console.log(`hit a mine at ${i},${j}`);
//         //   addOneAllAround(arrr);
//         // } else console.log(`NO MINE at ${i},${j}`);
//     }
//   }
// }
// flagger(gameArray);

//FUNCTION: created to count how many mines are around the boxes around
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
      } else console.log(`hit a mine at ${i}, ${j}`);
    }
  }
}
addOneAllAround(gameArray);

//FUNCTION: populates DOM with array values
//ARGUMENTS: receives the array
function populateDivs(arrr) {
  for (let i = 0 ; i < arrr.length; i++) {
    for (let j = 0; j < arrr[i].length; j++) {
      $('.row').eq(i).children('.cell').eq(j).html = arrr[i][j];
    }
  }
}
populateDivs(gameArray);

// console.log(gameArray);


