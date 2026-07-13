import { useState } from "react";
import Board from "./components/Board";
import MoveList from "./components/MoveList";
import initialBoard from "./data/initialBoard";
import { isValidMove } from "./utils/moveValidator";
import {
  isKingInCheck,
  isCheckMate,
  isMoveSafe,
  isDraw,
} from "./utils/checkLogic";
import { getMoveNotation } from "./utils/notation";
import Timer from "./components/Timer";

function App() {
  const [board, setBoard] = useState(initialBoard);
  const [selected, setSelected] = useState(null);
  const [turn, setTurn] = useState("White");
  const [moves, setMoves] = useState([]);
  const [whiteTime, setWhiteTime] = useState(600);
const [blackTime, setBlackTime] = useState(600);

const [capturedWhite, setCapturedWhite] = useState([]);
const [capturedBlack, setCapturedBlack] = useState([]);

const [legalMoves, setLegalMoves] = useState([]);
const [history, setHistory] = useState([]);
const [lastMove, setLastMove] = useState(null);
const [movedPieces, setMovedPieces] = useState({
  wk: false,
  bk: false,
  wrLeft: false,
  wrRight: false,
  brLeft: false,
  brRight: false,
});

   //This function runs whenever
  // the user clicks on a square.
  const handleSquareClick = (row, col) => {
    if (!selected) {
      if (board[row][col] === "") return;

      const piece = board[row][col];
      // Find all possible moves for the selected piece.
      const moves = [];

      // check every square on the board
for (let r = 0; r < 8; r++) {
  for (let c = 0; c < 8; c++) {
    if (isValidMove(board, row, col, r, c, movedPieces, lastMove)) {
      moves.push({ row: r, col: c });
    }
  }
}
// show all valid moves on the board
setLegalMoves(moves);

     // Make sure the player selects
    // only their own piece.
      if (turn === "White" && piece[0] !== "w") {
        alert("It's White's Turn");
        return;
      }

      if (turn === "Black" && piece[0] !== "b") {
        alert("It's Black's Turn");
        return;
      }

      setSelected({ row, col });
    } else {
      // get the color of the selected piece
      const color = board[selected.row][selected.col][0];

      // Check if the move is valid
      // and the king stays safe.
      if (
        !isValidMove(
          board,
          selected.row,
          selected.col,
          row,
          col,
          movedPieces,
          lastMove
        ) ||
        !isMoveSafe(
          board,
          selected.row,
          selected.col,
          row,
          col,
          color
        )
      ) {
        alert("Invalid Move");
        setSelected(null);
        setLegalMoves([]);
        return;
      }

      const capturedPiece = board[row][col];
      setHistory((prev) => [
        ...prev,
        board.map((row) => [...row])
      ]);

      //Create a copy of the current board
     // so the original board is not changed directly.
      const newBoard = board.map((r) => [...r]);
     
      //move the selected piece
      //to the new  square
      newBoard[row][col] =
        newBoard[selected.row][selected.col];

       //clear the old square
      newBoard[selected.row][selected.col] = "";
      const movedPiece = newBoard[row][col];
      // En Passant capture
if (
  movedPiece[1] === "p" &&
  selected.col !== col &&
  capturedPiece === ""
) {
  newBoard[selected.row][col] = "";
}


      // Remember if king or rook has moved.
if (movedPiece === "wk") {
  setMovedPieces((prev) => ({ ...prev, wk: true }));
}

if (movedPiece === "bk") {
  setMovedPieces((prev) => ({ ...prev, bk: true }));
}

if (movedPiece === "wr" && selected.row === 7 && selected.col === 0) {
  setMovedPieces((prev) => ({ ...prev, wrLeft: true }));
}

if (movedPiece === "wr" && selected.row === 7 && selected.col === 7) {
  setMovedPieces((prev) => ({ ...prev, wrRight: true }));
}

if (movedPiece === "br" && selected.row === 0 && selected.col === 0) {
  setMovedPieces((prev) => ({ ...prev, brLeft: true }));
}

if (movedPiece === "br" && selected.row === 0 && selected.col === 7) {
  setMovedPieces((prev) => ({ ...prev, brRight: true }));
}


      //  move the rook during Kingside Castling
if (
  movedPiece[1] === "k" &&
  Math.abs(col - selected.col) === 2 &&
  col > selected.col
) {
  newBoard[row][5] = newBoard[row][7];
  newBoard[row][7] = "";
}

//  move the rook during Queenside Castling
if (
  movedPiece[1] === "k" &&
  Math.abs(col - selected.col) === 2 &&
  col < selected.col
) {
  newBoard[row][3] = newBoard[row][0];
  newBoard[row][0] = "";
}

// promote white pawn
if (movedPiece === "wp" && row === 0) {
  const choice = prompt(
    "Promote pawn to (q = Queen, r = Rook, b = Bishop, n = Knight):",
    "q"
  );

  const piece = ["q", "r", "b", "n"].includes(choice)
    ? choice
    : "q";

  newBoard[row][col] = "w" + piece;
}

// promote black pawn
if (movedPiece === "bp" && row === 7) {
  const choice = prompt(
    "Promote pawn to (q = Queen, r = Rook, b = Bishop, n = Knight):",
    "q"
  );

  const piece = ["q", "r", "b", "n"].includes(choice)
    ? choice
    : "q";

  newBoard[row][col] = "b" + piece;
}

      if (capturedPiece !== "") {
        if (capturedPiece[0] === "w") {
          setCapturedWhite((prev) => [...prev, capturedPiece]);
        } else {
          setCapturedBlack((prev) => [...prev, capturedPiece]);
        }
      }

      const movingPiece = board[selected.row][selected.col];

const move = getMoveNotation(
  selected.row,
  selected.col,
  row,
  col,
  movingPiece,
  capturedPiece !== ""
);

      setMoves((prev) => [...prev, move]);
      setLastMove({
        piece: newBoard[row][col],
        fromRow: selected.row,
        fromCol: selected.col,
        toRow: row,
        toCol: col,
      });

      // update the board after the move
      setBoard(newBoard);
      setSelected(null);
      setLegalMoves([]);

      // change turn after a valid move
      const nextTurn = turn === "White" ? "Black" : "White";

      const nextColor = nextTurn === "White" ? "w" : "b";
      
      if (isCheckMate(newBoard, nextColor, movedPieces)) {
        alert("Checkmate! " + turn + " Wins!");
      } else if (isDraw(newBoard, nextColor, movedPieces)) {
        alert("Draw!");
      } else if (isKingInCheck(newBoard, nextColor)) {
        alert("Check!");
      }
      setTurn(nextTurn);
    }
  };

   // restore the previous board state
  const undoMove = () => {
    if (history.length === 0) {
      return;
    }
  
    const previousBoard = history[history.length - 1];
  
    setBoard(previousBoard);
  
    setHistory(
      history.slice(0, history.length - 1)
    );
  
    setTurn(
      turn === "White" ? "Black" : "White"
    );
  };

  return (
    <div className="app">
      <h1>Offline Chess Game</h1>

      <div
        style={{
          display: "flex",
          gap: "30px",
          alignItems: "flex-start",
        }}
      >
        <Board
          board={board}
          selected={selected}
          legalMoves={legalMoves}
          onSquareClick={handleSquareClick}
        />

        <div>
          <h2>Game Info</h2>

          <p>
            <strong>Current Turn:</strong> {turn}
          </p>

          <p>
  <strong>White Timer:</strong>
</p>

<Timer
  time={whiteTime}
  setTime={setWhiteTime}
  isActive={turn === "White"}
/>

<p>
  <strong>Black Timer:</strong>
</p>

<Timer
  time={blackTime}
  setTime={setBlackTime}
  isActive={turn === "Black"}
/>

          <MoveList moves={moves} />
          <button onClick={undoMove}>
  Undo Move
</button>
          <h3>Captured White</h3>
<p>{capturedWhite.join(" ")}</p>

<h3>Captured Black</h3>
<p>{capturedBlack.join(" ")}</p>
        </div>
      </div>
    </div>
  );
}

export default App;