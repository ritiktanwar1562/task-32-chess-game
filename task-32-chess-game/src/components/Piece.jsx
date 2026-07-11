const pieces = {
    wp: "♙",
    wr: "♖",
    wn: "♘",
    wb: "♗",
    wq: "♕",
    wk: "♔",
  
    bp: "♟",
    br: "♜",
    bn: "♞",
    bb: "♝",
    bq: "♛",
    bk: "♚",
  };
  
  function Piece({ piece }) {
    return <span className="piece">{pieces[piece] || ""}</span>;
  }
  
  export default Piece;