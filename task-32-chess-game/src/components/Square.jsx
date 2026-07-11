import Piece from "./Piece";

function Square({
  row,
  col,
  piece,
  selected,
  legalMove,
  onClick,
}) {
  const isWhite = (row + col) % 2 === 0;

  let background = isWhite ? "#f0d9b5" : "#b58863";

  if (selected) {
    background = "#ffd54f";
  } else if (legalMove) {
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
      <Piece piece={piece} />
    </div>
  );
}

export default Square;