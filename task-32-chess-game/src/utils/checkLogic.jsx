import { isValidMove } from "./moveValidator";

export function isKingInCheck(board, color) {
  let kingRow = -1;
  let kingCol = -1;

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
  const tempBoard = board.map((row) => [...row]);

  tempBoard[toRow][toCol] = tempBoard[fromRow][fromCol];
  tempBoard[fromRow][fromCol] = "";

  return !isKingInCheck(tempBoard, color);
}

export function isCheckMate(board, color, movedPieces = {}) {
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
              toCol,
              movedPieces
            ) &&
            isMoveSafe(
              board,
              fromRow,
              fromCol,
              toRow,
              toCol,
              color
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

export function isDraw(board, color, movedPieces = {}) {
  if (isKingInCheck(board, color)) {
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
              toCol,
              movedPieces
            ) &&
            isMoveSafe(
              board,
              fromRow,
              fromCol,
              toRow,
              toCol,
              color
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