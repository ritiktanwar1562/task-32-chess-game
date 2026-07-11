import Square from "./Square";

function Board({
  board,
  selected,
  legalMoves,
  onSquareClick,
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(8, 60px)",
        gridTemplateRows: "repeat(8, 60px)",
        width: "480px",
        height: "480px",
        border: "2px solid black",
      }}
    >
      {board.map((row, rowIndex) =>
        row.map((piece, colIndex) => (
          <Square
            key={`${rowIndex}-${colIndex}`}
            row={rowIndex}
            col={colIndex}
            piece={piece}
            selected={
              selected &&
              selected.row === rowIndex &&
              selected.col === colIndex
            }
            legalMove={legalMoves.some(
              (move) =>
                move.row === rowIndex &&
                move.col === colIndex
            )}
            onClick={() => onSquareClick(rowIndex, colIndex)}
          />
        ))
      )}
    </div>
  );
}

export default Board;