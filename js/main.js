console.log('Tic Tac Toe');

let board = [
  '', '', '',
  '', '', '',
  '', '', '',
];

let turn = 1;

const winLogic = function() {
}; //end of winLogic

const isPlayerOne = function() {
  turn += 1;
  return turn % 2 === 0
}; //end of playerTurn

const placeMark = function(event) {
  const index = parseInt(event.currentTarget.id) - 1;
  let markValue = '';
  if(board[index] == ''){
    if(isPlayerOne()){
      markValue = 'X';
    } else {
      markValue = 'O';
    };
    board[index] = markValue;
    $(event.currentTarget).text(markValue);
  } else {
    alert(`This square is already occupied by a mark.`);
  }
}; //end of placeMark

$(document).ready(function() {

  $('.box').on('click', placeMark); //end of .box click handler

}); // $(document).ready()
