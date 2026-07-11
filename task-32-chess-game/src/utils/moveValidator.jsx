export function isValidMove(board, fromRow, fromCol, toRow, toCol) {
    const piece = board[fromRow][fromCol];
  
    if (!piece) return false;
  
    const type = piece[1];      
    const color = piece[0];     
  

    if (fromRow === toRow && fromCol === toCol) {
      return false;
    }
  
    
    const target = board[toRow][toCol];
    if (target && target[0] === color) {
      return false;
    }
  
    //  Pawn 
    if (type === "p") {
      const direction = color === "w" ? -1 : 1;
      const startRow = color === "w" ? 6 : 1;
  
      
      if (
        toCol === fromCol &&
        toRow === fromRow + direction &&
        target === ""
      ) {
        return true;
      }
  
    
      if (
        fromRow === startRow &&
        toCol === fromCol &&
        toRow === fromRow + direction * 2 &&
        board[fromRow + direction][fromCol] === "" &&
        target === ""
      ) {
        return true;
      }
  
      
      if (
        Math.abs(toCol - fromCol) === 1 &&
        toRow === fromRow + direction &&
        target !== "" &&
        target[0] !== color
      ) {
        return true;
      }
  
      return false;
    }
    // Rook
  if (type === "r") {

    
    if (fromRow !== toRow && fromCol !== toCol) {
      return false;
    }

    
    if (fromRow === toRow) {
      const step = toCol > fromCol ? 1 : -1;

      for (let c = fromCol + step; c !== toCol; c += step) {
        if (board[fromRow][c] !== "") {
          return false;
        }
      }
    }

    // Vertical move
    if (fromCol === toCol) {
      const step = toRow > fromRow ? 1 : -1;

      for (let r = fromRow + step; r !== toRow; r += step) {
        if (board[r][fromCol] !== "") {
          return false;
        }
      }
    }

    return true;
  }

  //  Knight 
  if (type === "n") {

    const rowDiff = Math.abs(toRow - fromRow);
    const colDiff = Math.abs(toCol - fromCol);

    if (
      (rowDiff === 2 && colDiff === 1) ||
      (rowDiff === 1 && colDiff === 2)
    ) {
      return true;
    }

    return false;
  }
  //  Bishop 
  if (type === "b") {

    const rowDiff = Math.abs(toRow - fromRow);
    const colDiff = Math.abs(toCol - fromCol);

    
    if (rowDiff !== colDiff) {
      return false;
    }

    const rowStep = toRow > fromRow ? 1 : -1;
    const colStep = toCol > fromCol ? 1 : -1;

    let r = fromRow + rowStep;
    let c = fromCol + colStep;

    while (r !== toRow && c !== toCol) {
      if (board[r][c] !== "") {
        return false;
      }

      r += rowStep;
      c += colStep;
    }

    return true;
  }

  // Queen 
if (type === "q") {

    const rowDiff = Math.abs(toRow - fromRow);
    const colDiff = Math.abs(toCol - fromCol);
  
    
    if (rowDiff === colDiff) {
  
      const rowStep = toRow > fromRow ? 1 : -1;
      const colStep = toCol > fromCol ? 1 : -1;
  
      let r = fromRow + rowStep;
      let c = fromCol + colStep;
  
      while (r !== toRow && c !== toCol) {
        if (board[r][c] !== "") {
          return false;
        }
        r += rowStep;
        c += colStep;
      }
  
      return true;
    }
  
    // Horizontal move
    if (fromRow === toRow) {
  
      const step = toCol > fromCol ? 1 : -1;
  
      for (let c = fromCol + step; c !== toCol; c += step) {
        if (board[fromRow][c] !== "") {
          return false;
        }
      }
  
      return true;
    }
  
    // Vertical move
    if (fromCol === toCol) {
  
      const step = toRow > fromRow ? 1 : -1;
  
      for (let r = fromRow + step; r !== toRow; r += step) {
        if (board[r][fromCol] !== "") {
          return false;
        }
      }
  
      return true;
    }
  
    return false;
  }
  //  King 
if (type === "k") {

    const rowDiff = Math.abs(toRow - fromRow);
    const colDiff = Math.abs(toCol - fromCol);
  
    if (rowDiff <= 1 && colDiff <= 1) {
      return true;
    }
  
    return false;
  }


      
    return true;
  }