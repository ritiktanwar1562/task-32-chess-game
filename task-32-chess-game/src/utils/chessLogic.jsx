// create a copy of the board
export function copyBoard(board) {
    return board.map((row) => [...row]);
  }
  
  export function movePiece(board, fromRow, fromCol, toRow, toCol) {
    // copy board before making changes
    const newBoard = copyBoard(board);
  
    // move piece to new position
    newBoard[toRow][toCol] = newBoard[fromRow][fromCol];
    newBoard[fromRow][fromCol] = "";
  
    return newBoard;
  }
  
  export function getPiece(board, row, col) {
    // check if possible is outside the board
    if (row < 0 || row > 7 || col < 0 || col > 7) {
      return null;
    }
  
    return board[row][col];
  }
  
  export function isEmpty(board, row, col) {
    // check whether square is empty
    return getPiece(board, row, col) === "";
  }