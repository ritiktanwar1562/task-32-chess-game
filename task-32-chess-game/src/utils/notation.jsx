const files = ["a", "b", "c", "d", "e", "f", "g", "h"];

export function getMoveNotation(
  fromRow,
  fromCol,
  toRow,
  toCol,
  piece,
  isCapture = false
) {
  const to = files[toCol] + (8 - toRow);

  const pieceMap = {
    p: "",
    n: "N",
    b: "B",
    r: "R",
    q: "Q",
    k: "K",
  };

  return `${pieceMap[piece[1]]}${isCapture ? "x" : ""}${to}`;
}