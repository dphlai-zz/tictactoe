
console.log('Tic Tac Toe');

// This initialises the variable 'board' (an array) to an array of empty strings. It has been written in such a way so as to reflect a 3x3 grid.
let board = [
  '', '', '',
  '', '', '',
  '', '', '',
];

// This is a variable containing all the possible winning combinations on a 3x3 grid. The array values here correspond to positions on a 3x3 grid, i.e. the 'board' array.
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// This creates a variable, 'turn', which acts as a turn counter. It has been initialised to 1 and is required in the isPlayerOne function.
let turn = 1;

// These two variables track the number of wins each player records. They have been intialised to 0 and are required in the winLogic function.
let playerOneWins = 0;
let playerTwoWins = 0;

let gameOver = false;

const hideWinModal = function() {
  $('.winmodal, .drawmodal').css({
    'visibility': 'hidden'
  });
  resetBoard();
}; //End of hideWinModal()

const hideOtherModal = function() {
  $('.modal').css({
    'visibility': 'hidden'
  });
}; //End of hideOtherModal()

const winLogic = function() {
  // Initialise variable of 'winner' to an empty string.
  let winner = '';

  // The game loops through the winningCombos array
  for(let i = 0; i < winningCombos.length; i++) {
    // The game stores the index position of winningCombo array, of the current loop, into a variable called 'combo' (which is also an array).
    const combo = winningCombos[i];

    // Each item from the combo array is extracted into individual variables, which reflects the positions on the grid. It's the game asking itself "Which three boxes do I want to look at?"
    const positionOne = combo[0];
    const positionTwo = combo[1];
    const positionThree = combo[2];

    // This condition determines if there is a winner, based on whether positionOne, Two and Three equal eachother, i.e. the markValue is the same.
    if(board[positionOne] !== '' && board[positionOne] === board[positionTwo] && board[positionOne] === board[positionThree]){
      winner = board[positionOne];
    }
  } //end for loop

  // These conditions check to see if the game should continue, or declare that there is a winner.

  if(winner !== ''){
    if(winner === 'X'){
      playerOneWins += 1;
      $('#playeronewin').css({
        'visibility': 'visible'
      });
      $('#playerone').text(playerOneWins);
      gameOver = true;
    } else {
      playerTwoWins += 1;
      $('#playertwowin').css({
        'visibility': 'visible'
      });
      gameOver = true;
      $('#playertwo').text(playerTwoWins);
    }
  // If the turn counter = 10 and the winner variable is still '', then it will be a draw. Recall that the turn counter global variable has been initialised to 1.
  } else if(turn === board.length + 1){
    $('#draw').css({
      'visibility': 'visible'
    });
    gameOver = true;
  }

}; // End of winLogic

const resetBoard = function() {
  // This function loops through the board array and clears the markValue from the grid. It also resets the turn counter to 1.
  for(let i = 0; i < board.length; i++) {
    board[i] = ''
    $('#' + (i + 1)).text('');
  };
  turn = 1;
  gameOver = false;
}; // End of resetBoard

const resetGame = function() {
  resetBoard();
  turn = 1;
  playerOneWins = 0;
  $('#playerone').text('');
  playerTwoWins = 0;
  $('#playertwo').text('');
  gameOver = false;
}; // End of resetGame

// 'event' is passed through the placeMark function as an argument, as we require certain DOM key values within the function.
const placeMark = function(event) {

  // Initialises a variable called 'index' to the #id of the current box being clicked. -1 is necessary because my div IDs start at 1, and we need to call on this variable in an array further down the function.
  const index = parseInt(event.currentTarget.id) - 1;

  // Initialises 'markValue' to an empty string.
  let markValue = '';

  // Condition: if the index value of the board array (which corresponds to the currentTarget.id) is empty, then:
  if(board[index] == ''){
    markValue = 'X';
    turn += 1;
    board[index] = markValue;
    $(event.currentTarget).text(markValue);
    if(!gameOver) winLogic();
    console.log(gameOver);

    // switch to computer move
    markValue = 'O';
    turn += 1;
    let $emptyBoxes = $('.box:empty');
    let randomBoxIndex = Math.floor(Math.random() * $emptyBoxes.length);
    const randomBox = $emptyBoxes[randomBoxIndex];
    const boardIndex = parseInt(randomBox.id) - 1;
    $(randomBox).text(markValue);
    board[boardIndex] = markValue;
    if(!gameOver) winLogic();
    console.log(gameOver);

  // If the index position of the array is NOT empty, then the modal with the #occupiedsquare id will appear
  } else {
    $('#occupiedsquare').css({
      'visibility': 'visible'
    });
  }

  // At this point, the game will run the winLogic() function (see line 36) to check if there is in fact a winner. The game is essentially always checking if there is a winner, each time a mark is placed.
  // winLogic();
}; // End of placeMark()

$(document).ready(function() {
  // When an element that has a class of '.box' is clicked, the placeMark function is invoked (see line 110)
  $('.box').on('click', placeMark);
  $('button').on('click', resetGame);
  $('.winmodal .close-button').on('click', hideWinModal)
  $('.drawmodal .close-button').on('click', hideWinModal)
  $('#occupiedsquare .close-button').on('click', hideOtherModal)
}); // End of $(document).ready()
