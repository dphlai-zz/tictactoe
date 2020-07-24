let board = [
  '', '', '',
  '', '', '',
  '', '', '',
]; // This initialises the variable 'board' (an array) to an array of empty strings. It has been written in such a way so as to reflect a 3x3 grid.

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]; // This is a variable containing all the possible winning combinations on a 3x3 grid. The array values here correspond to positions on a 3x3 grid, i.e. the 'board' array.

let turn = 1; // This creates a variable, 'turn', which acts as a turn counter. It has been initialised to 1 and is required in the isPlayerOne function.

let playerOneWins = 0; // These two variables track the number of wins each player records. They have been intialised to 0 and are required in the winLogic function.
let playerTwoWins = 0;

let gameOver = false;

const hideWinDrawModal = function() {
  $('.winmodal, .drawmodal').css({
    'visibility': 'hidden'
  });
  resetBoard();
}; //End of hideWinDrawModal()

const hideOtherModal = function() {
  $('.modal').css({
    'visibility': 'hidden'
  });
}; //End of hideOtherModal()

const winLogic = function() {

  let winner = ''; // Initialise variable of 'winner' to an empty string.

  for(let i = 0; i < winningCombos.length; i++) { // The game loops through the winningCombos array
    const combo = winningCombos[i]; // The game stores the index position of winningCombo array, of the current loop, into a variable called 'combo' (which is also an array).

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
  resetBoard(); // In addition to resetting the board, resetGame() resets the turn and win counters, and resets gameOver to false
  turn = 1;
  playerOneWins = 0;
  $('#playerone').text('');
  playerTwoWins = 0;
  $('#playertwo').text('');
  gameOver = false;
}; // End of resetGame

const placeMark = function(event) { // 'event' is passed through the placeMark function as an argument, as we require certain DOM key values within the function.

  const index = parseInt(event.currentTarget.id) - 1; // Initialises a variable called 'index' to the #id of the current box being clicked. -1 is necessary because the div id's start at 1, and the game needs to call on this variable in an array further down this function.

  let markValue = ''; // Initialises 'markValue' to an empty string.

  if(board[index] == ''){ // Condition: if the index value of the board array (which corresponds to the currentTarget.id) is empty, then:
    markValue = 'X';
    turn += 1;
    board[index] = markValue;
    $(event.currentTarget).text(markValue);
    if(!gameOver) winLogic(); // Upon either the player or computer winning, gameOver will return true. Since by default, gameOver returns false, winLogic will run at this point.

    // At this point, the game switches to the computer's move
    markValue = 'O';
    turn += 1;
    let $emptyBoxes = $('.box:empty'); // This variable is an array of all the remaining empty boxes, i.e. elements with the 'box' class that have no text value
    let randomBoxIndex = Math.floor(Math.random() * $emptyBoxes.length); // 'randomBoxIndex' is a variable containing a random index position of the array
    const randomBox = $emptyBoxes[randomBoxIndex]; // This index position is then stored in the variable 'randomBox'
    $(randomBox).text(markValue); // The markValue is then placed into the random box
    const boardIndex = parseInt(randomBox.id) - 1; // The 'boardIndex' variable is required to update the global board variable, so that the game knows which squares are occupied
    board[boardIndex] = markValue;
    if(!gameOver) winLogic();

  } else { // Otherwise, if the index position of the array is NOT empty, then the modal with the #occupiedsquare id will appear
    $('#occupiedsquare').css({
      'visibility': 'visible'
    });
  }
}; // End of placeMark()

$(document).ready(function() {
  $('.box').on('click', placeMark); // When an element that has a class of '.box' is clicked, the placeMark function is invoked (see line 103)
  $('button').on('click', resetGame); // When the button element is clicked, the resetGame function is invoked (see line 93)
  $('.winmodal .close-button').on('click', hideWinDrawModal)
  $('.drawmodal .close-button').on('click', hideWinDrawModal)
  $('#occupiedsquare .close-button').on('click', hideOtherModal)
}); // End of $(document).ready()
