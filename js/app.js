//DOM event listener
$(function() {
  console.log('DOM loaded and ready!');

  // pick up values from URL to create the right board size
  const querypoint = window.location.href.indexOf('?') + 1;
  const sizeAndDiff = window.location.href.substr(querypoint);
  // we are expecting only two values so we split on the &
  const sizeAndDiffArray = sizeAndDiff.split('&')
  //size of the board, will be taken first split
  let boardSize = parseInt(sizeAndDiffArray[0].substr(sizeAndDiffArray[0].indexOf('=')+1));
  console.log('boardsize', boardSize);
  //variable that defines how many mines are placed inside the gameBoard
  let difficulty = parseInt(sizeAndDiffArray[1].substr(sizeAndDiffArray[0].indexOf('=')+1));
  console.log('the diff ',difficulty);

  //variable that defines the size of every box
  const cellSize = 30;
  const newWidth = (boardSize*cellSize)+10;

  //we need a mine counter as all minesweeper games have
  let mineCounter = 0;
  //we also need a flag counter
  let flagCounter = 0;
  //we need a timer too, displayed at the top
  let timerCounter = 0;

  //creating the vertical array to nest horizontal arrays
  // var row1 = [-1, 0, 0, 0];
  // var row2 = [0, -1, 0, 0];
  // var row3 = [-1, 0, 0, 0];
  // var row4 = [0, 0, 0, -1];
  // var gameArray = new Array(row1,row2,row3,row4);

  //Saving the new array in a openly defined array
  const gameArray = new Array;

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
        } // else console.log(`hit a mine at ${i}, ${j}`);
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
        // console.log(`gave cell ${i},${j} the value of ${arrr[i][j]}`);
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
    }).appendTo($('body'));

    // $('body').append($newContainerAll);
    let $newHeader = $("<header></header>");
    //point at header and change the size according to container
    $newHeader.css({
      'height' : `${boardSize*5}px`,
      'width' : `100%`
    }).appendTo($newContainerAll)

    //apending to containerAll
    // $newContainerAll.append($newHeader);

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
        // $newCell.on('click', lose);
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
    var childHorIndex = $(this).index();
    var childVerIndex = $(this).parent().index();
    lose(childVerIndex, childHorIndex)
  }

  //FUNCTION: handles what happens with right click
  //ARGUMENTS: takes the event it was targetted on
  function rightClick(event) {
    //change front image to
  }

  //FUNCTION: checks it the value of the clicked box is -1
  //ARGUMENTS: this from the event listener
  function lose(ver, hor) {
    //this index counter is not my idea. it's brilliant tho.
    //src = http://stackoverflow.com/questions/5913927/get-child-node-index
    // var childHorIndex = $(this).index();
    // debugger
    // var j = 0;
    // while((childHorIndex = childHorIndex.previousSibling) != null ) j++;
    // console.log(`index of element ${i}`);
    // var childVerIndex = $(this).parent().index();
    // var i = 0;
    // while((childVerIndex = childVerIndex.previousSibling) != null ) i++;
    // console.log(`clicked cell ${i},${j}`);

    //END of index idea
    // debugger
    //creating a switch to better handle the click
    // debugger
    switch ($('.row').eq(ver).children('.cell').eq(hor).children()[0].innerHTML) {

      case '-1': {
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
        break;
      } //END OF case -1

      //THIS IS WHERE PERMEATE FUNCTION LIVES
      case '0': {

        // debugger
        //this.parentNode.children.length
        console.log('hit a ZERO!!');
        // debugger
        //get location of this element

        //OPTION LEFT SIBLING
        // if (($(this).prev() !== null) && ($(this).prev().children()[0].innerHTML == 0)) {
        if ((hor > 0) && ($('.row').eq(ver).children('.cell').eq(hor-1).children().text() == 0) &&  ($('.row').eq(ver).children('.cell').eq(hor-1).hasClass('covered') == true) ) {
          console.log('has 0 LEFT cell');
          // lose(this.previousSibling);
          // debugger
          // $(this).prev().removeClass('covered').addClass('uncovered');
          // $('.row').eq(childVerIndex).children('.cell').eq(childHorIndex-1).removeClass('covered').addClass('uncovered');
          reveal(ver, hor-1);
          lose(ver, hor-1);
          //I HAVE NO IDEA WHY THIS INSTACE SPECIFICALLY DOESNT WORK IN JQUERY
          // $(this).prev().children()[0].style.visibility = 'visible'
          // $('.row').eq(childVerIndex).children('.cell').eq(childHorIndex-1).children().css({'visibility' : 'visible'});
          // $(this).prev().children()[0].css({'visibility' : 'visible'});
        } else if ((hor > 0) && ($('.row').eq(ver).children('.cell').eq(hor-1).children().text() !== -1)) {
          reveal(ver, hor-1);
        }

        //OPTION RIGHT SIBLING
        if ((hor < boardSize-1) && ($('.row').eq(ver).children('.cell').eq(hor+1).children().text() == 0) && ($('.row').eq(ver).children('.cell').eq(hor+1).hasClass('covered') == true)) {
          console.log('has 0 RIGHT cell');
          reveal(ver, hor+1);
          lose(ver, hor+1);
          // $('.row').eq(childVerIndex).children('.cell').eq(childHorIndex+1).removeClass('covered').addClass('uncovered');
          // $('.row').eq(childVerIndex).children('.cell').eq(childHorIndex+1).children().css({'visibility' : 'visible'});
        } else if ((hor < boardSize-1) && ($('.row').eq(ver).children('.cell').eq(hor+1).children().text() !== -1)) {
          reveal(ver, hor+1);
        }

        //OPTION TOP with options top left and top right
        if ((ver > 0) && ($('.row').eq(ver-1).children('.cell').eq(hor).children().text() == 0) && ($('.row').eq(ver-1).children('.cell').eq(hor).hasClass('covered') == true)) {
          console.log('has 0 TOP cell');
          reveal(ver-1, hor);
          lose(ver-1, hor);
          // $('.row').eq(childVerIndex-1).children('.cell').eq(childHorIndex).removeClass('covered').addClass('uncovered');
          // $('.row').eq(childVerIndex-1).children('.cell').eq(childHorIndex).children().css({'visibility' : 'visible'});

          //OPTION TOPLEFT CORNER
          if ((hor > 0) && ($('.row').eq(ver-1).children('.cell').eq(hor-1).children().text() == 0) && ($('.row').eq(ver-1).children('.cell').eq(hor-1).hasClass('covered') == true)) {
            console.log('has 0 TOPLEFT corner');
            reveal(ver-1, hor-1);
            lose(ver-1, hor-1);
            // $('.row').eq(childVerIndex-1).children('.cell').eq(childHorIndex).removeClass('covered').addClass('uncovered');
            // $('.row').eq(childVerIndex-1).children('.cell').eq(childHorIndex).children().css({'visibility' : 'visible'});
          } else if ((hor > 0) && ($('.row').eq(ver-1).children('.cell').eq(hor-1).children().text() !== -1)) {
            reveal(ver-1, hor-1);
          }

          //OPTION TOP RIGHT CORNER
          if ((hor < boardSize-1) && ($('.row').eq(ver-1).children('.cell').eq(hor+1).children().text() == 0) && ($('.row').eq(ver-1).children('.cell').eq(hor+1).hasClass('covered') == true)) {
            console.log('has 0 TOPRIGHT corner');
            reveal(ver-1, hor+1);
            lose(ver-1, hor+1);
          } else if ((hor < boardSize-1) && ($('.row').eq(ver-1).children('.cell').eq(hor+1).children().text() !== -1)) {
            reveal(ver-1, hor+1);
          }
        } else if ((ver > 0) && ($('.row').eq(ver-1).children('.cell').eq(hor).children().text() !== -1)) {
          reveal(ver-1, hor);
        }

        //OPTION BOTTOM with options bottom left and bottom right
        if ((ver < boardSize-1) && ($('.row').eq(ver+1).children('.cell').eq(hor).children().text() == 0) && ($('.row').eq(ver+1).children('.cell').eq(hor).hasClass('covered') == true)) {
          console.log('has 0 BOTTOM cell');
          reveal(ver+1, hor);
          lose(ver+1, hor);
          //OPTION BOTTOM RIGHT CORNER
          if ((hor < boardSize-1) && ($('.row').eq(ver+1).children('.cell').eq(hor+1).children().text() == 0) && ($('.row').eq(ver+1).children('.cell').eq(hor+1).hasClass('covered') == true)) {
            console.log('has 0 BOTTOMRIGHT corner');
            reveal(ver+1, hor+1);
            lose(ver+1, hor+1);
          } else if ((hor < boardSize-1) && ($('.row').eq(ver+1).children('.cell').eq(hor+1).children().text() !== -1)) {
            reveal(ver+1, hor+1);
          }
          //OPTION BOTTOM LEFT CORNER
          if ((hor > 0) && ($('.row').eq(ver+1).children('.cell').eq(hor-1).children().text() == 0) && ($('.row').eq(ver+1).children('.cell').eq(hor-1).hasClass('covered') == true)) {
            console.log('has 0 BOTTOMLEFT corner');
            reveal(ver+1, hor-1);
            lose(ver+1, hor-1);
          } else if ((hor > 0) && ($('.row').eq(ver+1).children('.cell').eq(hor-1).children().text() !== -1)) {
            reveal(ver+1, hor-1);
          }
        } else if ((ver < boardSize-1) && ($('.row').eq(ver+1).children('.cell').eq(hor).children().text() !== -1)) {
          reveal(ver+1, hor);
        }


        break;
      } //END OF CASE 0
      default: {
        console.log('todo bien');
        break;
      }
    } //END OF SWITCH
  } //END OF FUNCTION


  // FUNCTION: iterates the timer every second
  // ARGUMENTS: none, directly modifies the variable
  // function timer() {
  //   timerCounter++;
  // }

  // //FUNCTION: when user clicks a 0 it should permeat and open until it hits a number
  // //AGUMENTS: the array to check against
  // function permeateZero(event) {
  //   if (this.childNodes[0].innerHTML == 0) {




  //FUNCTION: made to calculate index of last siblings
  //ARGUMENTS: none at the moment
  function checkHorizontalIndex() {
    var i = 0;
    while( (child = child.previousSibling) != null ) i++;
  }

  function checkVerticalIndex() {

  }

  function reveal(ver, hor) {
    $('.row').eq(ver).children('.cell').eq(hor).removeClass('covered').addClass('uncovered');
    $('.row').eq(ver).children('.cell').eq(hor).children().css({'visibility' : 'visible'});
  }


  // starting the whole game logic here once declared everything
    createArray(gameArray, boardSize, boardSize);
    addOneAllAround(gameArray);
    createBoard(gameArray);
    populateDivs(gameArray);

}); // end of DOM listener




