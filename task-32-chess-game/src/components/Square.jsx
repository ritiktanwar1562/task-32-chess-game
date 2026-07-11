import Piece from "./Piece";

function Square({
  row,
  col,
  piece,
  selected,
  legalMove,
  onClick,
}) {
  // decide square color
  const isWhite = (row + col) % 2 === 0;

  let background = isWhite ? "#f0d9b5" : "#b58863";
// highlight selected peice
  if (selected) {
    background = "#ffd54f";
  }
  //highlight legal move squares
   else if (legalMove) {
    background = "#7CFC00";
  }

  return (
    <div
      onClick={onClick}
      style={{
        width: "60px",
        height: "60px",
        background,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "36px",
        cursor: "pointer",
        border: "1px solid black",
        userSelect: "none",
      }}
    >
      {/* display chess piece*/}
      <Piece piece={piece} />
    </div>
  );
}

export default Square;