//DOM event listener
$(function() {
  console.log('DOM loaded and ready!');
  // populateArray(gameArray);
  // createArray(3,3);
  createArray(gameArray, boardSize, boardSize);
  addOneAllAround(gameArray);
  createBoard(gameArray);
  populateDivs(gameArray);
})

//size of the board, will be taken from get form
var boardSize = 9;
//variable that defines how many mines are placed inside the gameBoard
var difficulty = 10;
//variable that defines the size of every box
var cellSize = 30;
var newWidth = (boardSize*cellSize)+10;

//we need a mine counter as all minesweeper games have
var mineCounter = 0;
//we also need a flag counter
var flagCounter = 0;
//we need a timer too
var timerCounter = 0;

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
        mineCounter++;
      } else arrr[i].push(0);
      //unsing push method to populate values
    }
  }
  console.log(arrr);
}


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

//FUNCTION: populates DOM with array values
//ARGUMENTS: receives the array
function populateDivs(arrr) {
  for (let i = 0 ; i < arrr.length; i++) {
    for (let j = 0; j < arrr[i].length; j++) {
      //had to put in a <p> to be able to hide the info on the screen
      let $newText = $('<p></p>');
      $newText.css({
        'visibility' : 'hidden'})
      $newText.html(arrr[i][j]);
      $('.row').eq(i).children('.cell').eq(j).append($newText);
      // document.getElementsByClassName('row')[i].getElementsByClassName('cell')[j].innerHtml = arrr[i][j];
      console.log(`gave cell ${i},${j} the value of ${arrr[i][j]}`);
    }
  }
}
// console.log(gameArray);

//FUNCTION: creates DIVS that are appended to the DOM once page loads
//ARGUMENTS: recieves the size of the board from a GET form
function createBoard(arrr) {
  //creating new container for everything
  let $newContainerAll = $("<div class='containerAll'></div>");
  //point to cointainerAll and change size according to the board
  $newContainerAll.css({
    'height' : `${(cellSize*boardSize)+(boardSize*5)}px`,
    'width' : `${cellSize*boardSize}px`
  })
  //apending to body
  $('body').append($newContainerAll);

  //creating the header
  let $newHeader = $("<header></header>");
  //point at header and change the size according to container
  $newHeader.css({
    'height' : `${boardSize*5}px`,
    'width' : `100%`
  })
  //apending to containerAll
  $newContainerAll.append($newHeader);

  //creating new MineCounter
  //REMEMBER to display the mine counter!
  let $newMineCounter = $("<div id='counter'>" + mineCounter + "</div>");
  //point at minecounter and append
  $newHeader.append($newMineCounter);

  //creating new Reset Button
  let $newResetButton = $("<div id='resetButton'></div>");
  //appending new resetButton
  $newHeader.append($newResetButton);

  //creating new timer
  let $newTimer = $("<div id='timer'>0</div>");
  //appending new timer to header
  $newHeader.append($newTimer);

  //THIS PART OF THE CODE COULD BE REDUNDANT
  //creating new ContainerGame
  // let $newContainerGame = $("<div class='containerGame'></div>");
  // //modify size of containerGame according to the board
  // $('.containerGame').css({
  //   'height' : `${cellSize*boardSize}px`,
  //   'width' : `${cellSize*boardSize}px`
  // })

  //create new DIV with class container
  let $newSection = $("<section class ='gameBoard'></section>");
  $newSection.css({
    'width' : `${cellSize*boardSize}px`,
    'height' : `${cellSize*boardSize}px`
  })
  //apending to $newContainerAll
  $newContainerAll.append($newSection);
  //entering for loop to iterate through nested arrays
  for (let i = 0; i < arrr.length; i++) {
    //creating new row to append to $newSection
    let $newRow = $("<div class = 'row'></div>");
    //giving height and width for $newRow
    $newRow.css({
    'width' : `${cellSize*boardSize}px`,
    'height' : `${cellSize}px`
    })
    //apending $newRow to $newSection
    $newSection.append($newRow);
    for (let j = 0; j < arrr[i].length; j++) {
      //creating new cell to append to row
      let $newCell = $("<div class='cell covered'></div>");
      // <img src='./images/flag2.png' class='flag'>
      //giving that cell css properties for formatting
      $newCell.css({
        'height' : `${cellSize}px`,
        'width' : `${cellSize}px`,
        'cursor' : 'default',
      })
      // onclick="handleLeftClick(this);" oncontextmenu="handleRightClick(this); return false;"
      //adding event listener during creation
      $newCell.on('click', leftClick);
      $newCell.on('click', lose);
      //apending child element to row
      $newRow.append($newCell);
    }
  }
}

// //FUNCTION: called by left click event listener
// //ARGUMENTS: recieves event from the DOM and modifies values of that item
// function showCell(event) {
//   // debugger
//   //removing class to uncover mine
//   // event.target.removeClass('.covered');
//   //to be able to determine left click from right
//   switch (event.which) {
//     //left click
//     case 1: {
//       // debugger
//       // event.target.removeClass('uncovered');
//       // this.css({
//       //   'visibility' : 'visible'});
//       console.log('left click');
//       break;
//     }
//     //middle click
//     case 2: {
//       console.log('middle click');
//       // event.target.addClass('uncovered');
//       break;
//     }
//     //right click
//     case 3: {
//       console.log('right click');
//       //add class with flag image
//       break;
//     }
//     default: {
//       console.log('this mouse is weird')
//     }
//   }

// }


//FUNCTION: handles what happens with left click
//ARGUMENTS: takes the event it was triggered on
function leftClick(event) {
  // debugger
  $(this).removeClass('covered');
  $(this).addClass('uncovered');
  $(this).children().eq(0).css({'visibility' : 'visible'});
}

//FUNCTION: handles what happens with right click
//ARGUMENTS: takes the event it was targetted on
function rightClick(event) {
  //change front image to
}

//FUNCTION: checks it the value of the clicked box is -1
//ARGUMENTS: this from the event listener
function lose(event) {
  if (this.childNodes[0].innerHTML == -1) {
    //double for loop that reveals mines
    for (let i = 0; i < gameArray.length; i++) {
      for(let j = 0; j < gameArray[0].length; j++) {
        //ifstatement to check if -1
        // debugger
        if ($('.row').eq(i).children('.cell').eq(j).children()[0].innerHTML == -1) {
          console.log(`value of cell [${i}][${j}] is -1`);
          //apparently this is also acceptable for a switch class statement
          $('.row').eq(i).children('.cell').eq(j).removeClass('covered').addClass('uncovered');
          //making the text visible again after class switch
          $('.row').eq(i).children('.cell').eq(j).children().eq(0).css({'visibility' : 'visible'});
        }
      }
    }
    alert('You hit a mine!');
    //TODO: change mine image to corssed mine
  } else console.log('you are fine');
}


// FUNCTION: iterates the timer every second
// ARGUMENTS: none, directly modifies the variable
function timer() {
  timerCounter++;
}

//FUNCTION: when user clicks a 0 it should permeat and open until it hits a number
//AGUMENTS: the array to check against
function permeateZero(event) {

}







