function MoveList({ moves }) {
    return (
      <div>
{/* display all moves played in the game*/}          
        <h3>Move List</h3>
  
        <ol>
          {/* create one list item for each move*/}
          {moves.map((move, index) => (
            <li key={index}>{move}</li>
          ))}
        </ol>
      </div>
    );
  }
  
  export default MoveList;