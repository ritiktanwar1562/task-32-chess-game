export function copyBoard(board) {
    return board.map((row) => [...row]);
  }
  
  export function movePiece(board, fromRow, fromCol, toRow, toCol) {
    const newBoard = copyBoard(board);
  
    newBoard[toRow][toCol] = newBoard[fromRow][fromCol];
    newBoard[fromRow][fromCol] = "";
  
    return newBoard;
  }
  
  export function getPiece(board, row, col) {
    if (row < 0 || row >7 || col < 0 || col > 7) {
      return null;
    }
  
    return board[row][col];
  }
  
  export function isEmpty(board, row, col) {
    return getPiece(board, row, col) === "";
  }