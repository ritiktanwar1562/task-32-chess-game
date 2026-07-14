import { isValidMove } from "./moveValidator";
const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
function getDisambiguation(
  board,
  piece,
  fromRow,
  fromCol,
  toRow,
  toCol
) {
  if (piece[1] === "p" || piece[1] === "k") {
    return "";
  }

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      if (row === fromRow && col === fromCol) {
        continue;
      }
      if (board[row][col] === piece) {
        if (
          isValidMove(
            board,
            row,
            col,
            toRow,
            toCol
          )
        ) {
          if (col === fromCol) {
            return 8 - fromRow;
          }
      
          return files[fromCol];
        }
      }
    }
  }

  return "";
}

export function getMoveNotation(
  board,
  fromRow,
  fromCol,
  toRow,
  toCol,
  piece,
  isCapture = false
) {
  const to = files[toCol] + (8 - toRow);
  const disambiguation = getDisambiguation(
    board,
    piece,
    fromRow,
    fromCol,
    toRow,
    toCol
  );





  const pieceMap = {
    p: "",
    n: "N",
    b: "B",
    r: "R",
    q: "Q",
    k: "K",
  };

  return `${pieceMap[piece[1]]}${disambiguation}${isCapture ? "x" : ""}${to}`;
}