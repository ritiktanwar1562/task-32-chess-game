function MoveList({ moves }) {
    return (
      <div>
        <h3>Move List</h3>
  
        <ol>
          {moves.map((move, index) => (
            <li key={index}>{move}</li>
          ))}
        </ol>
      </div>
    );
  }
  
  export default MoveList;