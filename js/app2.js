//DOM event listener
$(function() {
  console.log('DOM loaded and ready!');
  // populateArray(gameArray);
  createArray(3,3);
})

//size of the board, will be taken from get form
var boardSize = 3;

//creating the vertical array to nest horizontal arrays
var row1 = [0, 0, 0, 0];
var row2 = [0, -1, 0, 0];
var row3 = [0, 0, 0, 0];
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

//FUNCTION: one by one check how many mines are around
function flagger(arrr) {
  //double for loop for iteration in matrix
  for (let i = 0; i < arrr.length; i++) {
    for (let j = 0; j < arrr[i].length; j++) {

    }
  }
}

//function created to add +1 to boxes around when you hit a mine
function iterateAround(arrr) {

}

