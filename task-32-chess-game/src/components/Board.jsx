import Square from "./Square";

function Board({
  board,
  selected,
  legalMoves,
  onSquareClick,
}) {
  // display the chess board using CSS grid
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
      {/* create all 64 squares */}
      {board.map((row, rowIndex) =>
        row.map((piece, colIndex) => (
          <Square
            key={`${rowIndex}-${colIndex}`}
            row={rowIndex}
            col={colIndex}
            piece={piece}
            // highlight selected piece
            selected={
              selected &&
              selected.row === rowIndex &&
              selected.col === colIndex
            }
            // highlight  legal moves
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