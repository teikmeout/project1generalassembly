//DOM event listener
$(function() {
  console.log('DOM loaded and ready!');
  populateArray(gameArray);
})

//size of the board, will be taken from get form
var boardSize = 3;

//creating the vertical array to nest horizontal arrays
var gameArray = new Array([],[],[]);

// default function that populates a 3x3 array
//with values from 1 to 9
function populateArray(arrr) {
  let counter = 1;
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 2; j++){
      arrr[i][j] = counter;
      counter++;
      console.log(`row ${i}, column ${j} = ${arrr[i][j]}`);
    }
  }
}


// this fn randomizes values to determine if there's going to be a mine
function newGame(arrr) {
  // for (let i = 0; i < gameArray.size)
}
