// files used for chess notation
const files = ["a", "b", "c", "d", "e", "f", "g", "h"];

export function getMoveNotation(fromRow, fromCol, toRow, toCol) {
  //convert board position into chess notation
  const from = files[fromCol] + (8 - fromRow);
  const to = files[toCol] + (8 - toRow);

 return `${from}-${to}`;
}