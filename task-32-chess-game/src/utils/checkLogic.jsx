import { isValidMove } from "./moveValidator";

export function isKingInCheck(board, color) {
  let kingRow = -1;
  let kingCol = -1;

  // Find King's Position
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

export function isCheckMate(board, color) {
    if (!isKingInCheck(board, color)) {
      return false;
    }
  
    for (let fromRow = 0; fromRow < 8; fromRow++) {
      for (let fromCol = 0; fromCol < 8; fromCol++) {
  
        const piece = board[fromRow][fromCol];
  
        if (piece === "" || piece[0] !== color) {
          continue;
        }
  
        for (let toRow = 0; toRow < 8; toRow++) {
          for (let toCol = 0; toCol < 8; toCol++) {
  
            if (
              isValidMove(
                board,
                fromRow,
                fromCol,
                toRow,
                toCol
              )
            ) {
              return false;
            }
          }
        }
      }
    }
  
    return true;
  }