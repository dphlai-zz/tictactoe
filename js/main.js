
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

const toggleModal = function() {
  $('.modal').css({
    'visibility': 'hidden'
  });
}; //End of toggleModal()

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
      resetBoard();
    } else {
      playerTwoWins += 1;
      $('#playertwowin').css({
        'visibility': 'visible'
      });
      $('#playertwo').text(playerTwoWins);
      resetBoard();
    }
  // If the turn counter = 10 and the winner variable is still '', then it will be a draw. Recall that the turn counter global variable has been initialised to 1.
  } else if(turn === board.length + 1){
    $('#draw').css({
      'visibility': 'visible'
    });
    resetBoard();
  }

}; // End of winLogic

const resetBoard = function() {
  // This function loops through the board array and clears the markValue from the grid. It also resets the turn counter to 1.
  for(let i = 0; i < board.length; i++) {
    board[i] = ''
    $('#' + (i + 1)).text('');
  };
  turn = 1;
}; // End of resetBoard

const resetGame = function() {
  resetBoard();
  turn = 1;
  playerOneWins = 0;
  $('#playerone').text('');
  playerTwoWins = 0;
  $('#playertwo').text('');
}; // End of resetGame

const isPlayerOne = function() {
  // When isPlayerOne is invoked, the turn variable increments by 1. Recall that this has been initialised to 1 as a global variable (line 24)
  turn += 1;
  // The function returns a value of true, i.e. the function will return a value of true whenever it is Player One's turn. By using the modulus expression, false is returned if the remainder is greater than 0, meaning it is Player Two's turn.
  return (turn % 2 === 0)
}; // End of isPlayerOne()

// 'event' is passed through the placeMark function as an argument, as we require certain key values within the function.
const placeMark = function(event) {

  // Initialises a variable called 'index' to the #id of the current box being clicked. -1 is necessary because my div IDs start at 1, and we need to call on this variable in an array further down the function.
  const index = parseInt(event.currentTarget.id) - 1;

  // Initialises 'markValue' to an empty string.
  let markValue = '';

  // Condition: if the index value of the board array (which corresponds to the currentTarget.id) is empty, then:
  if(board[index] == ''){
    // If it's Player One, assign markValue a value of 'X'. How do we determine if it's Player One? We must invoke the isPlayerOne function (see line 102)
    if(isPlayerOne()){
      markValue = 'X';
    // The else statement is essentially catering for isPlayerOne() returning false. Since it's Player Two, we assign markValue a value of 'O'.
    } else {
      markValue = 'O';
    }

    // Once the mark has been determined, the game will take either the 'X' or 'O' and insert it into the respective array index (which up to this point has a value of an empty string).
    board[index] = markValue;

    // This causes the 'X' or 'O' to appear on screen, in the box that has been clicked.
    $(event.currentTarget).text(markValue);

  // If the index position of the array is NOT empty, then the modal with the #occupiedsquare id will appear
  } else {
    $('#occupiedsquare').css({
      'visibility': 'visible'
    });
  }

  // At this point, the game will run the winLogic() function (see line 36) to check if there is in fact a winner. The game is essentially always checking if there is a winner, each time a mark is placed.
  winLogic();
}; // End of placeMark()

$(document).ready(function() {
  // When an element that has a class of '.box' is clicked, the placeMark function is invoked (see line 110)
  $('.box').on('click', placeMark);
  $('button').on('click', resetGame);
  $('.close-button').on('click', toggleModal)
}); // End of $(document).ready()
