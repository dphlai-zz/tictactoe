
console.log('Tic Tac Toe');

// This initialises the variable 'board', which is an array, to an array of empty strings. It has been written in such a way as to reflect a 3x3 grid.
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

// This creates a variable, 'turn', which acts as a turncounter. It has been initialised to 1 and is required for the isPlayerOne function.
let turn = 1;

const winLogic = function() {
  // Initialise variable of 'winner' to an empty string.
  let winner = '';

  // The game will now loop through the winningCombos array
  for(let i = 0; i < winningCombos.length; i++) {
    // The game stores the index position of winningCombo array, of the current loop, into a variable called 'combo' (which is also an array).
    const combo = winningCombos[i];

    // These variables essentially translate to the positions on the grid. It's the game asking itself "Which three boxes do I want to look at?"
    const positionOne = combo[0];
    const positionTwo = combo[1];
    const positionThree = combo[2];

    // This condition determines if there is a winner, based on whether positionOne, Two and Three equal eachother, i.e. the markValue is the same.
    if(board[positionOne] !== '' && board[positionOne] === board[positionTwo] && board[positionOne] === board[positionThree]){
      winner = board[positionOne];
      console.log(`We have a winner!`, combo);
    }
  } //end for loop

  // These conditions check to see if the game should continue, or declare that there is a winner.

  if(winner !== ''){
    if(winner === 'X'){
      alert('Player 1 has won the game!');
      resetGame();
    } else {
      alert('Player 2 has won the game!')
      resetGame();
    }
  // If the turn counter = 10 and the winner variable is still '', then it will be a draw.
  } else if(turn === board.length + 1){
    alert('Draw!')
    resetGame();
  }

}; //end of winLogic

const resetGame = function() {
  // This function loops through the board array and clears the markValue from the grid. It also resets the turn counter to 1.
  for(let i = 0; i < board.length; i++) {
    board[i] = ''
    $('#' + (i + 1)).text('');
  };
  turn = 1;
}; //end of resetGame

const isPlayerOne = function() {
  // When isPlayerOne is invoked, the turn variable increments by 1
  turn += 1;
  // The function returns a value of true, i.e. the function will return a value of true whenever it is Player One's turn.
  return (turn % 2 === 0)
}; // End of isPlayerOne()

const placeMark = function(event) {

  // Initialises a variable called 'index' to the #id of the current box being clicked. -1 is necessary because my div IDs start at 1, and we need to call on this variable in an array further down the function.
  const index = parseInt(event.currentTarget.id) - 1;

  // Initialises 'markValue' to an empty string.
  let markValue = '';

  // Condition: if the index value of the board array (which corresponds to the currentTarget.id) is empty, then:
  if(board[index] == ''){
    // If it's Player One, assign markValue a value of 'X'. How do we determine if it's Player One? We must invoke the isPlayerOne function (see line 65)
    if(isPlayerOne()){
      markValue = 'X';
    // The else statement is essentially catering for isPlayerOne() returning false. Since it's Player Two, we assign markValue a value of 'O'.
    } else {
      markValue = 'O';
    }

    // Take either the 'X' or 'O' and insert it into the respective array index (which up to this point has a value of an empty string)
    board[index] = markValue;

    //This causes the 'X' or 'O' to appear on screen, in the box that has been clicked.
    $(event.currentTarget).text(markValue);

  // If the index position of the array is NOT empty, then the following alert will appear
  } else {
    alert(`This square is already occupied by a mark.`);
  }

  // At this point, the game will run the winLogic() function (see line 26) to check if there is indeed a winner, A 100 millisecond offset has been applied, to allow for a mark to appear before the winning alert is displayed.
  setTimeout(winLogic, 100)
}; // End of placeMark()

$(document).ready(function() {
  // When an element that has a class of '.box' is clicked, the placeMark function is invoked (see line 72)
  $('.box').on('click', placeMark);
}); // $(document).ready()
