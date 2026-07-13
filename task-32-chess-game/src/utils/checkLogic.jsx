import { isValidMove } from "./moveValidator";

export function isKingInCheck(board, color) {
  // find the current player's king position
  let kingRow = -1;
  let kingCol = -1;

  // search the board to locate the king
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      if (board[row][col] === color + "k") {
        kingRow = row;
        kingCol = col;
      }
    }
  }

  
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];

      if (piece !== "" && piece[0] !== color) {
        if (
          isValidMove(
            board,
            row,
            col,
            kingRow,
            kingCol
          )
        ) {
          return true;
        }
      }
    }
  }

  return false;
}

export function isMoveSafe(board, fromRow, fromCol, toRow, toCol, color) {
  // create a temporary copy of the board
    const tempBoard = board.map((row) => [...row]);
    // apply the move on the copied board  
    tempBoard[toRow][toCol] = tempBoard[fromRow][fromCol];
    tempBoard[fromRow][fromCol] = "";
     // move is safe only if king is not in check
    return !isKingInCheck(tempBoard, color);
  }

export function isCheckMate(board, color, movedPieces = {}) {
  // first check if the king is actually in check
    if (!isKingInCheck(board, color)) {
      return false;
    }
  // try every piece of the current player
    for (let fromRow = 0; fromRow < 8; fromRow++) {
      for (let fromCol = 0; fromCol < 8; fromCol++) {
  
        const piece = board[fromRow][fromCol];
  // skip empty squares and opponent pieces
        if (piece === "" || piece[0] !== color) {
          continue;
        }
      // test every possible destination
        for (let toRow = 0; toRow < 8; toRow++) {
          for (let toCol = 0; toCol < 8; toCol++) {
  // if any legal move saves the king then its not checkmate
            if (
              isValidMove(
                board,
                fromRow,
                fromCol,
                toRow,
                toCol,
                movedPieces
              )&&
                isMoveSafe(board, fromRow, fromCol, toRow, toCol, color)
              ) {
                return false;
              }
          }
        }
      }
    }
  // no move can save the king
    return true;
  }