/*
  This file contains the movement rules for all chess pieces.
  Each piece has its own movement logic.*/

function isDiagonalPathClear(board, fromRow, fromCol, toRow, toCol) {
    const rowStep = toRow > fromRow ? 1 : -1;
    const colStep = toCol > fromCol ? 1 : -1;
  
    let currentRow = fromRow + rowStep;
    let currentCol = fromCol + colStep;
  
    while (currentRow !== toRow) {
      if (board[currentRow][currentCol] !== "") {
        return false;
      }
      
      currentRow += rowStep;
      currentCol += colStep;
    }
  
    return true;
  }
  // check if horizontal path is clear
function isHorizontalPathClear(board, row, fromCol, toCol) {
  const step = toCol > fromCol ? 1 : -1;

  for (let col = fromCol + step; col !== toCol; col += step) {
    if (board[row][col] !== "") {
      return false;
    }
  }

  return true;
}

// check if vertical path is clear
function isVerticalPathClear(board, col, fromRow, toRow) {
  const step = toRow > fromRow ? 1 : -1;

  for (let row = fromRow + step; row !== toRow; row += step) {
    if (board[row][col] !== "") {
      return false;
    }
  }

  return true;
}

  // check whether the selected move is valid
  export function isValidMove(
    board,
    fromRow,
    fromCol,
    toRow,
    toCol,
    movedPieces = {},
    lastMove = null
  ){
     const piece = board[fromRow][fromCol];
  
    if (!piece) return false;
  // get piece type and color
    const type = piece[1];      
    const color = piece[0];     
  
// player cannot move to the same square
    if (fromRow === toRow && fromCol === toCol) {
      return false;
    }
  
    // player cannot capture own piece
    const target = board[toRow][toCol];
    if (target && target[0] === color) {
      return false;
    }
  
    //  Pawn  movement
    if (type === "p") {
      const direction = color === "w" ? -1 : 1;
      const startRow = color === "w" ? 6 : 1;
  
// pawn normally moves one square forward    
      if (
        toCol === fromCol &&
        toRow === fromRow + direction &&
        target === ""
      ) {
        return true;
      }
  
    // if the pawn is on its starting square, it can move two square
      if (
        fromRow === startRow &&
        toCol === fromCol &&
        toRow === fromRow + direction * 2 &&
        board[fromRow + direction][fromCol] === "" &&
        target === ""
      ) {
        return true;
      }

      // pawn captures pieces diagonally
if (
  Math.abs(toCol - fromCol) === 1 &&
  toRow === fromRow + direction &&
  target !== "" &&
  target[0] !== color
) {
  return true;
}
// check if an en passant capture is possible
if (
  Math.abs(toCol - fromCol) === 1 &&
  toRow === fromRow + direction &&
  target === "" &&
  lastMove &&
  lastMove.piece[1] === "p" &&
  
  Math.abs(lastMove.fromRow - lastMove.toRow) === 2 &&
  lastMove.toRow === fromRow &&
  lastMove.toCol === toCol
) {
  return true;
}
  
    
      return false;
    }
    

    // Rook movement
  if (type === "r") {

    // If rook is moving horizontally, check all squares in between.
if (fromRow === toRow) {
  return isHorizontalPathClear(board, fromRow, fromCol, toCol);
}

// If rook is moving vertically, check all squares in between.
if (fromCol === toCol) {
  return isVerticalPathClear(board, fromCol, fromRow, toRow);
}

return false;
  }
  
  //  Knight movement
  if (type === "n") {

    const rowDiff = Math.abs(toRow - fromRow);
    const colDiff = Math.abs(toCol - fromCol);

    if (
      (rowDiff === 2 && colDiff === 1) ||
      (rowDiff === 1 && colDiff === 2)
    ) {
      return true;
    }

    return false;
  }
  //  Bishop  movement
  if (type === "b") {

    const rowDiff = Math.abs(toRow - fromRow);
    const colDiff = Math.abs(toCol - fromCol);

    
    if (rowDiff !== colDiff) {
      return false;
    }


if (rowDiff !== colDiff) {
  return false;
}


return isDiagonalPathClear(board, fromRow, fromCol, toRow, toCol);
  }

  // Queen movement
if (type === "q") {

  // Queen can move diagonally like a bishop.
  const diagonalMove =
    Math.abs(toRow - fromRow) === Math.abs(toCol - fromCol);

  if (diagonalMove) {
    return isDiagonalPathClear(board, fromRow, fromCol, toRow, toCol);
  }

  // Queen can also move in a straight line like a rook.
  if (fromRow === toRow) {
    return isHorizontalPathClear(board, fromRow, fromCol, toCol);
  }

  if (fromCol === toCol) {
    return isVerticalPathClear(board, fromCol, fromRow, toRow);
  }

  return false;
}
  //  King  movement

if (type === "k") {

    const rowDiff = Math.abs(toRow - fromRow);
    const colDiff = Math.abs(toCol - fromCol);
  
    // king can move one square in any direction
    if (rowDiff <= 1 && colDiff <= 1) {
      return true;
    }
  // kingside castling
  if (
    rowDiff === 0 &&
    colDiff === 2 &&
    toCol > fromCol &&
    !movedPieces[color + "k"] &&
    !movedPieces[color + "rRight"] &&
    board[fromRow][7] === color + "r" &&
    board[fromRow][5] === "" &&
    board[fromRow][6] === ""
  ) {
    return true;
  }

  // queenside castling
  if (
    rowDiff === 0 &&
    colDiff === 2 &&
    toCol < fromCol &&
    !movedPieces[color + "k"] &&
    !movedPieces[color + "rLeft"] &&
    board[fromRow][0] === color + "r" &&
    board[fromRow][1] === "" &&
    board[fromRow][2] === "" &&
    board[fromRow][3] === ""
  ) {
    return true;
  }

  return false;
}

return false;
  }