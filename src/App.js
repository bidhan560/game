import React, { useState } from 'react';
import './index.css';

const INITIAL_STATE = Array(9).fill(null);



const TicTacToe = () => {
  const [squares, setSquares] = useState(INITIAL_STATE);
  const [xIsNext, setXIsNext] = useState(true);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], line: [a, b, c] };
      }
    }

    return null;
  };

  const isBoardFull = (squares) => {
    return squares.every((square) => square !== null);
  };

  const handleClick = (i) => {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  };

  const renderSquare = (i) => {
    const winnerInfo = calculateWinner(squares);
    const isWinnerSquare = winnerInfo && winnerInfo.line.includes(i);

    return (
      <button
        className={`square ${isWinnerSquare ? 'winner' : ''}`}
        onClick={() => handleClick(i)}
      >
        {squares[i]}
      </button>
    );
  };

  const winnerInfo = calculateWinner(squares);
  const isDraw = isBoardFull(squares) && !winnerInfo;

  let status;
  if (winnerInfo) {
    status = `Winner: ${winnerInfo.winner}`;
  } else if (isDraw) {
    status = "It's a draw!";
  } else {
    status = `Player's Turn: ${xIsNext ? 'X' : 'O'}`;
  }

  const congratulatoryMsg = winnerInfo ? (
    <div className="congratulations">
      <p>Congratulations!!!! Reload the page to play again.</p>
    </div>
  ) : null;

  return (
    <div>
      <div className="status">{status}</div>
      {congratulatoryMsg}
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};

const StudentInfo = () => {
  return (
    <div className="student-info">
      <div className="student-details">
        <img src="/image.jpeg" alt="Student" className="student-image" />
        <div>
          <h1>Bidhan Shrestha</h1>
          <h1>Student ID: 22054339</h1>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <StudentInfo />
      <TicTacToe />
    </div>
  );
};

export default App;

