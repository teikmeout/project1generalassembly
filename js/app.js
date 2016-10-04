//DOM event listener
$(function() {
  console.log('DOM loaded and ready!');
  // populateArray(gameArray);
  createArray(3,3);
})

//size of the board, will be taken from get form
var boardSize = 3;

//creating the vertical array to nest horizontal arrays
var gameArray = new Array([],[],[]);
var gameArray2 = [];

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
createArray(3,3);

//FUNCTION: creates an empty array by taking arguments of
//horizontal size and vertical size
function createArray(x, y) {
  let gameArray3 = [];
  //creating a for loop to give columns
  for (let i = 0; i < x; i++) {
    //using push method to add array to the array
    gameArray3.push([]);
    for (let j = 0; j < y; j++) {
      //unsing push method to populate values
      gameArray3[i].push('0')
    }
  }
  console.log(gameArray3);
}


// this fn randomizes values to determine if there's going to be a mine
function newGame(arrr) {
  // for (let i = 0; i < gameArray.size)
}
