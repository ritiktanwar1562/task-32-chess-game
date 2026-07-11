import { useState } from "react";
import Board from "./components/Board";
import MoveList from "./components/MoveList";
import initialBoard from "./data/initialBoard";
import { isValidMove } from "./utils/moveValidator";
import { isKingInCheck, isCheckMate } from "./utils/checkLogic";
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

  const handleSquareClick = (row, col) => {
    if (!selected) {
      if (board[row][col] === "") return;

      const piece = board[row][col];
      const moves = [];

for (let r = 0; r < 8; r++) {
  for (let c = 0; c < 8; c++) {
    if (isValidMove(board, row, col, r, c)) {
      moves.push({ row: r, col: c });
    }
  }
}

setLegalMoves(moves);


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
      if (
        !isValidMove(
          board,
          selected.row,
          selected.col,
          row,
          col
        )
      ) {
        alert("Invalid Move");
        setSelected(null);
        return;
      }

      const capturedPiece = board[row][col];
      setHistory((prev) => [
        ...prev,
        board.map((row) => [...row])
      ]);
      const newBoard = board.map((r) => [...r]);

      newBoard[row][col] =
        newBoard[selected.row][selected.col];

      newBoard[selected.row][selected.col] = "";
      if (capturedPiece !== "") {
        if (capturedPiece[0] === "w") {
          setCapturedWhite((prev) => [...prev, capturedPiece]);
        } else {
          setCapturedBlack((prev) => [...prev, capturedPiece]);
        }
      }

      const move = getMoveNotation(
        selected.row,
        selected.col,
        row,
        col
      );

      setMoves((prev) => [...prev, move]);

      setBoard(newBoard);
      setSelected(null);
      setLegalMoves([]);

      const nextTurn = turn === "White" ? "Black" : "White";

      const nextColor = nextTurn === "White" ? "w" : "b";
      
      if (isCheckMate(newBoard, nextColor)) {
        alert("Checkmate! " + turn + " Wins!");
      } else if (isKingInCheck(newBoard, nextColor)) {
        alert("Check!");
      }
      
      setTurn(nextTurn);
    }
  };

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